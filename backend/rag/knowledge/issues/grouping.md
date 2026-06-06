# Issue Grouping

## Overview

Issue grouping is the process of combining related error events into a single issue.

Grouping is powered by fingerprint generation.

When multiple events produce the same fingerprint, they are treated as occurrences of the same problem.

## Why Grouping Matters

Applications often generate repeated errors.

Without grouping, dashboards can become flooded with duplicate issues.

Grouping provides several benefits:

- Cleaner dashboards
- Easier prioritization
- Reduced duplicate records
- Better issue visibility

## Event Relationship

Each issue may contain:

- Multiple occurrences
- Multiple log entries
- Multiple timestamps

Although many events may belong to a single issue, every event remains available as an individual log record for debugging purposes.

## Result

Grouping allows developers to focus on unique problems rather than reviewing identical errors repeatedly.