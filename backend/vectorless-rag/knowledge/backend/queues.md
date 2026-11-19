# Queue System

BugLens uses a queue-based architecture to separate event ingestion from event processing.

When events arrive, they are placed into a queue instead of being written directly to the database.

The queue system consists of:

- Disk-backed storage
- In-memory processing queues
- Queue monitoring
- Capacity management

The queue provides several important benefits:

- Reduced ingestion latency
- Improved reliability
- Traffic spike absorption
- Asynchronous processing

Because the queue is disk-backed, events can survive process restarts and temporary failures.

Queue size is continuously monitored to prevent overload situations.

If configured limits are exceeded, the system may temporarily reject new events until queue capacity becomes available.

The queue serves as a buffer between incoming traffic and backend processing operations.