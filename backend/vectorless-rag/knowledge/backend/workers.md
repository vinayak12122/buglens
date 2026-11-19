# Background Workers

Background workers are responsible for processing events that have been placed into the queue.

Workers operate independently from incoming API requests.

Their responsibilities include:

- Consuming queued events
- Generating fingerprints
- Checking for existing issues
- Creating new issues
- Updating occurrence counts
- Storing logs
- Triggering real-time broadcasts

Because processing occurs asynchronously, the ingestion endpoint remains responsive even during periods of high traffic.

Workers continuously monitor the queue and process events in batches.

Separating processing from ingestion improves scalability and allows the platform to absorb traffic spikes without immediately overwhelming database resources.

The worker layer acts as the core processing engine of BugLens.