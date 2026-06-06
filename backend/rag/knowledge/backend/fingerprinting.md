# Fingerprinting

Fingerprinting is the mechanism BugLens uses to identify whether an error has already been seen before.

Every incoming event is analyzed and transformed into a deterministic fingerprint.

The fingerprint is generated using information such as:

- Error message
- Stack trace
- Error location

Because identical errors generate identical fingerprints, BugLens can determine whether a new event belongs to an existing issue.

Fingerprinting provides several benefits:

- Duplicate issue prevention
- Automatic issue grouping
- Cleaner dashboards
- Reduced noise

Without fingerprinting, thousands of identical runtime errors would create thousands of separate issues.

Instead, BugLens groups related events under a single issue while still preserving individual log records for debugging purposes.

Fingerprint-based grouping is the primary deduplication strategy used by the platform.