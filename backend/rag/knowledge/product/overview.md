# BugLens Overview

BugLens is a real-time error monitoring and debugging platform designed to help developers identify, track, group, and resolve application issues efficiently.

The platform consists of three primary components:

1. Browser SDK
2. Backend Processing System
3. Monitoring Dashboard

The Browser SDK captures runtime errors occurring inside client applications. Captured events are batched and transmitted to the BugLens backend.

The backend validates incoming requests using project-specific public API keys and processes events through a queue-based architecture.

Events are grouped into issues using deterministic fingerprint generation, preventing duplicate issues from being created for identical errors.

Processed issues and logs are stored in PostgreSQL and streamed to connected dashboard clients through WebSocket connections.

BugLens provides issue tracking, log inspection, project management, API key generation, and real-time monitoring capabilities.

Its build or creat by Vinayak Mishra who is computer science student.