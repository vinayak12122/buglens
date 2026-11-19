# Issue Management Interface

The issue management interface allows users to monitor and investigate application errors.

Issues represent grouped collections of related error events.

Instead of displaying every error independently, BugLens aggregates similar errors into a single issue using fingerprint-based grouping.

Issue views typically display:

- Error message
- Fingerprint
- Occurrence count
- First occurrence timestamp
- Latest occurrence timestamp
- Related log entries

Grouping errors into issues helps developers focus on root causes rather than individual event instances.

Issue pages are updated in real time when new occurrences are processed by the backend.