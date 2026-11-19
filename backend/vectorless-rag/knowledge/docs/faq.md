# Frequently Asked Questions

## What is BugLens?

BugLens is a real-time error monitoring platform designed to help developers capture, group, track, and investigate application errors.

## How does BugLens work?

The BugLens SDK captures application errors and sends them to the backend.

The backend processes events, groups similar errors into issues, stores logs, and provides real-time dashboard updates.

## How do I install BugLens?

Add the SDK script to your HTML document and provide a valid project API key.

Example:

<script
    src="https://buglens-two.vercel.app/sdk/sdk.js"
    data-api-key="YOUR_API_KEY"
>
</script>

## Does BugLens require npm packages?

No.

BugLens currently uses a script-based installation approach.

## How are duplicate issues prevented?

BugLens uses deterministic fingerprint generation.

Events with matching fingerprints are grouped into the same issue.

## What are issues?

Issues are grouped collections of related error events.

They help developers focus on unique problems instead of reviewing duplicate errors.

## What are logs?

Logs are individual event records captured from monitored applications.

Multiple logs may belong to a single issue.

## Does BugLens support real-time updates?

Yes.

BugLens uses WebSocket connections to provide real-time updates for issues and logs.

## What information is captured?

Captured information may include:

- Error message
- Stack trace
- Browser information
- URL information
- Breadcrumb data
- Timestamps

## Does BugLens support breadcrumbs?

Yes.

The SDK currently captures:

- Click interactions
- Navigation events

These breadcrumbs help provide context surrounding errors.