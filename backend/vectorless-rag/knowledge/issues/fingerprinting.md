# Issue Fingerprinting

## Overview

Fingerprinting is the process used by BugLens to determine whether multiple error events represent the same underlying problem.

Each incoming event is transformed into a deterministic fingerprint.

Events that generate the same fingerprint are considered related and are associated with the same issue.

## Purpose

The primary goals of fingerprinting are:

- Duplicate issue prevention
- Automatic issue grouping
- Reduced dashboard noise
- Simplified error tracking

## How It Works

When an event enters the processing pipeline, BugLens analyzes information such as:

- Error message
- Stack trace
- Error location

This information is used to generate a fingerprint.

If a matching fingerprint already exists within the project, the event is attached to the existing issue.

If no matching fingerprint exists, a new issue is created.

## Benefits

Fingerprinting allows BugLens to handle large numbers of repeated errors without overwhelming developers with duplicate issue records.

Instead of displaying thousands of identical errors, BugLens presents a single issue with an updated occurrence count.