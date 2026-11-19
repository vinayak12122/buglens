# Queue Flow

## Overview

BugLens uses a queue-based architecture to separate event ingestion from event processing.

Rather than writing events directly to the database, incoming events first enter a queue.

This queue acts as a buffer between incoming traffic and backend processing operations.

## Flow

The complete queue flow is:

SDK
→ Ingestion API
→ Queue
→ Background Worker
→ Processing
→ Database Storage
→ WebSocket Broadcast

## Benefits

Using a queue provides several advantages:

- Reduced ingestion latency
- Better traffic handling
- Improved reliability
- Protection against sudden traffic spikes

The queue allows the backend to continue accepting events even when processing workloads temporarily increase.

## Persistence

BugLens uses a disk-backed queue system.

This improves reliability because queued events can survive temporary service interruptions and process restarts.

## Role In Monitoring

The queue system is a critical component that enables scalable event collection and processing throughout the BugLens platform.