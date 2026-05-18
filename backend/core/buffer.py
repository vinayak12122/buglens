import asyncio
import random
import logging
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor
from diskcache import Deque, Lock,Cache
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy import func

from database.connection import SessionLocal
from database.models import Log, Issue
from api.routes.projects import manager

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

lock_cache = Cache("ingest_buffer/lock")

log_queue = Deque(directory="ingest_buffer/main")
processing_queue = Deque(directory="ingest_buffer/processing")
flush_lock = Lock(lock_cache, "flush_lock")

# Config
MAX_BUFFER = 50000
MAX_BATCH = 100
FLUSH_INTERVAL = 1

executor = ThreadPoolExecutor(max_workers=2)


def sync_db(batch):
    db = SessionLocal()
    try:
        agg = {}
        for item in batch:
            fp = item["fingerprint"]
            if fp not in agg:
                agg[fp] = {"count": 0, "meta": item, "events": []}
            agg[fp]["count"] += 1
            agg[fp]["events"].append(item)

        issue_stmt = insert(Issue).values([
            {
                "project_id": item_data["meta"]["project_id"],
                "fingerprint": fp,
                "title": item_data["meta"]["message"][:255],
                "count": item_data["count"],
                "status": "unresolved",
                "severity": item_data["meta"].get("severity", "error"),
                "last_seen": func.now(),
                "latest_message": item_data["meta"]["message"],
                "latest_stack": item_data["meta"].get("stack"),
                "latest_page": item_data["meta"].get("page"),
                "latest_browser": item_data["meta"].get("browser"),
                "latest_payload": item_data["meta"].get("payload"),
            }
            for fp, item_data in agg.items()
        ])

        upsert_stmt = issue_stmt.on_conflict_do_update(
            index_elements=["project_id", "fingerprint"],
            set_={
                "count": Issue.count + issue_stmt.excluded.count,
                "status": "unresolved",
                "severity": issue_stmt.excluded.severity,
                "last_seen": func.now(),
                "latest_message": issue_stmt.excluded.latest_message,
                "latest_stack": issue_stmt.excluded.latest_stack,
                "latest_page": issue_stmt.excluded.latest_page,
                "latest_browser": issue_stmt.excluded.latest_browser,
                "latest_payload": issue_stmt.excluded.latest_payload,
            }
        ).returning(Issue.id, Issue.fingerprint)

        result = db.execute(upsert_stmt)
        issue_map = {r.fingerprint: r.id for r in result}

        log_rows = []
        for fp, item_data in agg.items():
            issue_id = issue_map.get(fp)
            if not issue_id:
                continue

            for ev in item_data["events"]:
                log_rows.append({
                    "id": ev["event_id"],
                    "project_id": ev["project_id"],
                    "issue_id": issue_id,
                    "type": ev["type"],
                    "message": ev["message"],
                    "stack": ev.get("stack"),
                    "page": ev.get("page"),
                    "browser": ev.get("browser"),
                    "payload": ev.get("payload"),
                })

        if log_rows:
            stmt = insert(Log).values(log_rows).on_conflict_do_nothing(
                index_elements=["id"]
            )
            db.execute(stmt)

        db.commit()
        return agg, issue_map

    except Exception as e:
        db.rollback()
        logger.error(f"DB Error: {e}")
        return False
    finally:
        db.close()


async def flusher():
    logger.info("🚀 Flusher started...")
    retry_delay = FLUSH_INTERVAL

    while len(processing_queue) > 0:
        log_queue.appendleft(processing_queue.pop())

    while True:
        await asyncio.sleep(retry_delay)

        if len(log_queue) == 0:
            retry_delay = FLUSH_INTERVAL
            continue

        batch = []

        with flush_lock:
            while len(log_queue) > 0 and len(batch) < MAX_BATCH:
                item = log_queue.popleft()
                processing_queue.append(item)
                batch.append(item)

        if not batch:
            continue

        loop = asyncio.get_running_loop()
        result = await loop.run_in_executor(executor, sync_db, batch)


        if result:
            agg, issue_map = result

            project_issue_updates = {}

            for fp, item_data in agg.items():
                project_id = item_data["meta"]["project_id"]

                if project_id not in project_issue_updates:
                    project_issue_updates[project_id] = []

                project_issue_updates[project_id].append({
    "issue_id": str(issue_map.get(fp)),
    "fingerprint": fp,
    "count": item_data["count"],
    "message": item_data["meta"]["message"],
    "stack": item_data["meta"].get("stack"),
    "page": item_data["meta"].get("page"),
    "browser": item_data["meta"].get("browser"),
    "timestamp": datetime.utcnow().isoformat()
})

            for project_id, issues in project_issue_updates.items():
                asyncio.create_task(
                    manager.broadcast(project_id, {
                        "type": "ISSUE_BATCH_UPDATE",
                        "data": issues
                    })
                )
                asyncio.create_task(
                    manager.broadcast("global", {
                        "type": "PROJECT_STATS_UPDATE",
                        "data": {
                            "project_id": project_id,
                            "issues_count": len(issues),
                            "logs_count": sum(
                                issue["count"]
                                for issue in issues
                            )
                        }
                    })
                )

            for _ in range(len(batch)):
                if len(processing_queue) > 0:
                    processing_queue.popleft()

            retry_delay = FLUSH_INTERVAL
            logger.info(f"Flushed {len(batch)} logs")

        else:
            logger.warning(f"Flush failed. Retrying in {retry_delay}s")

            for _ in range(len(batch)):
                if len(processing_queue) > 0:
                    log_queue.appendleft(processing_queue.pop())

            retry_delay = min(retry_delay * 2, 60) + random.uniform(0, 1)

            if retry_delay >= 60:
                logger.error("DB Critical: long downtime detected")