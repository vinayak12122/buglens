# Deployment

## Overview

BugLens is designed to work with deployed frontend applications through a simple script-based integration.

Deployment does not require special build steps or framework-specific configuration.

## Deployment Process

1. Create a BugLens project.
2. Generate a public API key.
3. Add the SDK script to your application.
4. Deploy your application normally.

Example:

<script
    src="https://buglens-two.vercel.app/sdk/sdk.js"
    data-api-key="YOUR_API_KEY"
>
</script>

## Verification After Deployment

After deployment:

- Open the application
- Verify the SDK script loads
- Trigger a test error
- Confirm the event appears in BugLens

## Monitoring

Once deployed, BugLens continuously monitors the application and reports captured events to the configured project.