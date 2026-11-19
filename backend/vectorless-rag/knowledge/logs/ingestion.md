# Log Ingestion

## Overview

Log ingestion is the process through which BugLens receives error events from monitored applications.

When an application experiences an error, the BugLens SDK captures the event and sends it to the backend ingestion endpoint.

The ingestion system acts as the entry point for all log data entering the platform.

## Ingestion Flow

The ingestion process consists of several stages:

1. SDK captures an error event.
2. Event data is prepared for transmission.
3. Request is sent to the BugLens ingestion endpoint.
4. API key validation is performed.
5. Event metadata is generated.
6. Event is placed into the processing queue.

The ingestion endpoint focuses on accepting events quickly and avoids expensive operations during the request lifecycle.

## Purpose

The primary purpose of ingestion is to reliably accept incoming events and prepare them for processing.

This approach allows BugLens to handle high volumes of incoming error traffic efficiently.