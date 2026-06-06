# Real-Time Updates

BugLens uses WebSocket connections to provide real-time updates throughout the dashboard.

When a user opens monitoring views such as dashboards, issue pages, or log pages, the frontend establishes a persistent connection with the backend.

Instead of repeatedly polling the server for updates, the frontend listens for incoming WebSocket messages.

Updates may include:

- New issues
- Issue occurrence changes
- New log events
- Project activity updates

When new information arrives, the frontend updates the user interface automatically without requiring a page refresh.

Benefits include:

- Lower network overhead
- Faster update delivery
- Reduced server load
- Improved monitoring experience

The WebSocket architecture enables BugLens to function as a real-time monitoring platform.