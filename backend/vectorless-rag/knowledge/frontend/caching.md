# Frontend Caching

BugLens uses in-memory caching to reduce unnecessary API requests and improve page responsiveness.

Caching is implemented using JavaScript Map objects. When data such as projects, issues, or logs is requested, the frontend first checks whether the information already exists in cache.

If cached data is available, the frontend returns the cached version immediately without making another request to the backend.

Benefits of caching include:

- Faster page navigation
- Reduced backend load
- Lower network usage
- Improved user experience

Caching is particularly useful when users frequently switch between project dashboards, issue pages, and log views.

Current limitations:

- Cache is stored only in memory
- Refreshing the page clears cached data
- Cached information is not persisted across browser sessions

Future improvements may include IndexedDB storage, service worker caching, and cache synchronization strategies.