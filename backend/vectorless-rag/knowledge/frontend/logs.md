# Log Inspection Interface

The log inspection interface provides detailed visibility into individual error events captured by the BugLens SDK.

Each log record contains information such as:

- Event identifier
- Error message
- Stack trace
- Browser information
- URL information
- Payload metadata
- Timestamp

Because production systems can generate large numbers of log records, BugLens uses pagination to load logs in smaller batches.

Pagination improves performance by reducing browser memory usage and minimizing rendering overhead.

Log views may also receive real-time updates through WebSocket connections when new events are processed.