# Real-Time Log Updates

## Overview

BugLens provides real-time visibility into newly processed log events.

As workers process incoming events, updates can be delivered immediately to connected dashboard users through WebSocket connections.

## Update Flow

The realtime update process follows these steps:

1. Event enters the queue.
2. Worker processes the event.
3. Log record is created.
4. WebSocket notification is generated.
5. Connected clients receive the update.
6. Dashboard interfaces refresh automatically.

## Benefits

Real-time updates provide several advantages:

- Immediate visibility into new errors
- Reduced need for manual refreshes
- Lower polling overhead
- Faster incident detection

## Dashboard Experience

When viewing log pages, users can see newly processed events appear automatically as they are received and processed by the backend.

This helps BugLens function as a live monitoring platform rather than a static reporting system.

## Purpose

The realtime update system ensures that developers remain informed about application problems as they occur.