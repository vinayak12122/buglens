# Issue Lifecycle

## Overview

An issue represents a grouped collection of related error events within BugLens.

Rather than creating a new issue for every error occurrence, BugLens attempts to determine whether an incoming event belongs to an existing issue.

This approach helps reduce noise and allows developers to focus on unique problems rather than individual event instances.

## Issue Creation

The lifecycle begins when an error event is captured by the BugLens SDK and processed by the backend.

During processing, a fingerprint is generated from the event.

If no existing issue with the same fingerprint exists within the project, a new issue is created.

The new issue becomes the primary container for future occurrences of that error.

## Issue Updates

When additional events produce the same fingerprint, BugLens updates the existing issue instead of creating a new one.

Issue updates may include:

- Increasing occurrence count
- Updating latest occurrence timestamp
- Linking additional log records
- Triggering realtime dashboard updates

## Issue Monitoring

Developers can inspect issue details through the dashboard.

Issue views provide information such as:

- Error message
- Fingerprint
- Occurrence count
- First occurrence
- Latest occurrence
- Related logs

## Purpose

The issue lifecycle is designed to provide a structured view of application problems while preventing duplicate issue creation.