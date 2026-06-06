# Installation

## Overview

Installing BugLens requires adding the BugLens SDK script to your application's HTML document.

The SDK automatically initializes itself when loaded and begins monitoring the application for supported error events.

## Installation

Add the following script tag to your HTML file:

<script
    src="https://buglens-two.vercel.app/sdk/sdk.js"
    data-api-key="YOUR_API_KEY"
>
</script>

Replace YOUR_API_KEY with the public API key generated for your BugLens project.

## Verification

After installation:

1. Open your application.
2. Ensure the SDK script loads successfully.
3. Trigger a test error.
4. Open the BugLens dashboard.
5. Verify that the event appears in your project.

Once the script is loaded successfully, BugLens begins monitoring automatically.

## Requirements

To use BugLens you need:

- An active BugLens account
- A project
- A valid public API key

No additional packages or build tools are required.