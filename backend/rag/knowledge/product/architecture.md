# BugLens Architecture

BugLens follows a multi-stage event processing architecture.

Flow:

SDK
→ Ingestion API
→ Queue Layer
→ Background Worker
→ PostgreSQL
→ WebSocket Broadcast
→ Dashboard

The architecture separates event ingestion from event processing.

Incoming requests are accepted quickly and placed into queues.

Background workers perform issue aggregation, fingerprint matching, database writes, and notification broadcasts.

This separation improves scalability and protects ingestion performance during traffic spikes.

The architecture consists of:

- Browser SDK
- FastAPI Backend
- Disk-backed Queue System
- Background Workers
- PostgreSQL Database
- WebSocket Notification Layer
- React Dashboard