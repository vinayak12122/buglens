# Real-Time Broadcasting

BugLens uses WebSocket connections to deliver real-time updates to dashboard users.

When users open project dashboards, issue pages, or log views, the frontend establishes a persistent connection with the backend.

A WebSocket connection manager tracks active users and project subscriptions.

When workers process new events, the backend can immediately notify subscribed clients.

Common broadcast events include:

- New issues
- Updated issues
- New log records
- Occurrence count changes

This approach eliminates the need for continuous polling and reduces unnecessary network traffic.

Real-time broadcasting allows monitoring dashboards to stay synchronized with backend activity as events are processed.