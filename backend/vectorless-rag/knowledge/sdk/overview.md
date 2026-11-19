# BugLens SDK Overview

The BugLens SDK is a lightweight browser-side monitoring script responsible for capturing application errors and sending them to the BugLens backend.

The SDK is designed to require minimal setup. Applications only need to include the BugLens script and provide a valid project API key.

Installation example:

<script
    src="https://buglens-two.vercel.app/sdk/sdk.js"
    data-api-key="YOUR_API_KEY"
>
</script>

Once loaded, the SDK automatically begins monitoring the application for supported error events.

The SDK acts as the first stage of the BugLens monitoring pipeline and is responsible for:

- Capturing browser errors
- Collecting diagnostic information
- Batching events
- Sending data to the BugLens backend

Captured events are later processed, grouped into issues, stored as logs, and displayed within the BugLens dashboard.

The SDK is designed to operate with minimal developer configuration while providing visibility into frontend application failures.