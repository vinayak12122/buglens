# Event Ingestion

The event ingestion system acts as the entry point for all error events captured by the BugLens SDK.

When an application experiences an error, the SDK sends an event payload to the BugLens ingestion endpoint.

The ingestion pipeline performs several steps:

1. Receive the event request.
2. Validate the project API key.
3. Parse the event payload.
4. Generate metadata.
5. Create an internal event object.
6. Place the event into the queue.

The ingestion endpoint is intentionally lightweight and avoids expensive processing operations.

Instead of performing database writes during the request lifecycle, events are queued for asynchronous processing.

This design keeps ingestion latency low and allows the platform to handle larger traffic volumes efficiently.

If queue capacity limits are reached, the ingestion system may temporarily reject new requests until processing capacity becomes available.