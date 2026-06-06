# Backend Architecture

BugLens is built on top of FastAPI and follows an asynchronous event-processing architecture designed for collecting, processing, grouping, storing, and streaming application errors.

The backend is divided into several independent responsibilities:

- Event ingestion
- Authentication and validation
- Queue buffering
- Background processing
- Issue aggregation
- Database persistence
- Real-time broadcasting

When an error event is captured by the BugLens SDK, it is sent to the ingestion API. The backend validates the request, enriches the event with metadata, and places it into a queue.

A dedicated background worker processes queued events independently from the request lifecycle. During processing, fingerprints are generated, issues are updated or created, logs are stored, and real-time notifications are sent to connected dashboard clients.

The architecture separates ingestion from processing, ensuring that incoming requests remain fast even when the system is handling large numbers of events.

Major backend components include:

- FastAPI API Layer
- Authentication Layer
- Disk Base Queue System
- Background Workers
- PostgreSQL Database
- WebSocket Notification Layer

This design improves scalability, reliability, and maintainability while supporting real-time monitoring capabilities.