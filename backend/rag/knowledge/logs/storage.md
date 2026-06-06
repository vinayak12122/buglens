# Log Processing

## Overview

Log processing occurs after an event has been accepted by the ingestion system and placed into the queue.

Processing is performed asynchronously by background workers.

This separation allows event ingestion to remain fast while more expensive operations occur independently.

## Processing Tasks

During processing, BugLens may perform tasks such as:

- Event validation
- Metadata enrichment
- Fingerprint generation
- Issue lookup
- Issue creation
- Occurrence updates
- Log record creation

## Relationship With Issues

Every processed event becomes an individual log record.

At the same time, BugLens determines whether the event belongs to an existing issue or requires the creation of a new issue.

This allows developers to view both high-level issue summaries and detailed event records.

## Result

Successful processing transforms raw SDK events into searchable and organized monitoring data.