# Breadcrumbs

## Overview

BugLens collects breadcrumbs to provide additional context surrounding application errors.

Breadcrumbs are small records of user activity that occur before an error is captured. They help developers understand what actions a user performed leading up to an issue.

Rather than only viewing the final error, developers can inspect the sequence of interactions that happened beforehand.

## Current Breadcrumb Types

The BugLens SDK currently records:

- Click interactions
- Browser navigation events

### Click Events

When a user clicks an element, BugLens records information such as:

- Element tag name
- Visible text content
- Timestamp

This helps identify which user action may have contributed to an error.

### Navigation Events

BugLens records browser navigation activity when navigation occurs through browser history changes.

Information collected includes:

- Current URL
- Timestamp

This helps developers understand page transitions that occurred before an issue was triggered.

## Breadcrumb Storage

Breadcrumbs are maintained in a rolling in-memory collection.

To prevent unbounded growth, BugLens stores only a limited number of recent breadcrumbs.

Current behavior:

- Maximum breadcrumb count: 20
- Oldest entries are automatically removed when the limit is exceeded

This ensures memory usage remains predictable while preserving recent activity history.

## Error Context

When an error occurs, breadcrumbs can be attached to the captured event to provide additional debugging context.

Examples of useful context include:

- Buttons clicked before an error
- User navigation flow
- Recent interactions leading up to a failure

This additional information can significantly reduce debugging time by helping developers reproduce issues more accurately.

## Current Limitations

The current breadcrumb implementation focuses on basic interaction tracking.

Currently supported:

- Click events
- Navigation events

Not currently supported:

- Network requests
- Console logs
- Application state changes
- Custom breadcrumbs
- Form interactions

Future versions of BugLens may expand breadcrumb collection to include additional diagnostic signals.