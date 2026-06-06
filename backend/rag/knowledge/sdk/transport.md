# Event Transport

The BugLens SDK is responsible for delivering captured events from the browser to the BugLens backend.

After events are collected and prepared, they are transmitted to the BugLens ingestion API.

During transmission:

- The project API key identifies the destination project.
- Event payloads are packaged into a structured format.
- Diagnostic metadata is included with each event.

The backend validates incoming requests before accepting events into the processing pipeline.

Successful transport allows captured browser events to become searchable issues and logs within the BugLens dashboard.

Transport reliability is a critical part of the monitoring pipeline because all backend processing depends on successful event delivery.