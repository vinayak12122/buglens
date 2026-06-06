# Scalability

BugLens improves scalability through several mechanisms.

Frontend:

- In-memory caching
- Pagination
- Reduced API requests
- Indexed lookups
- Reusable components
- WebSocket updates

Backend:

- Queue-based ingestion
- Disk-backed persistence
- Background processing workers
- Issue aggregation through fingerprints
- Batched event processing

These mechanisms allow BugLens to handle increasing volumes of projects, logs, and issues without significantly impacting user experience.