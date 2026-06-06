# Authentication and Project Validation

BugLens uses project-specific public API keys to authenticate incoming SDK events.

Every ingestion request includes a public key within the request headers.

Before processing begins, the backend validates the provided key and determines which project owns the request.

Authentication serves several purposes:

- Prevent unauthorized event ingestion
- Isolate project data
- Ensure correct event ownership
- Protect monitoring resources

If the provided API key is invalid, the request is rejected immediately and no event processing occurs.

Successful validation allows the event to continue through the ingestion pipeline.

Project-level authentication forms the foundation of BugLens event security.