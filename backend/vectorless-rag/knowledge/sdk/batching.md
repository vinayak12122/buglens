# Event Batching

The BugLens SDK batches events before sending them to the backend.

Rather than creating a network request for every individual error, multiple events can be grouped together and transmitted in a more efficient manner.

Batching provides several benefits:

- Reduced network overhead
- Lower request volume
- Improved browser performance
- Better scalability

Once batching conditions are met, the SDK prepares a payload and sends the collected events to the BugLens ingestion endpoint.

The backend then processes each event individually through the queue and worker system.

Batching helps BugLens handle large volumes of frontend errors efficiently.