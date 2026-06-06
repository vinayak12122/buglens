# SDK Initialization

Initializing the BugLens SDK requires adding the BugLens script to an application's HTML document.

Example:

<script
    src="https://buglens-two.vercel.app/sdk/sdk.js"
    data-api-key="YOUR_API_KEY"
>
</script>

The data-api-key attribute identifies the BugLens project that should receive captured events.

When the script loads, the SDK automatically initializes itself and begins monitoring the application.

No additional setup code is required.

During initialization, the SDK:

- Loads into the browser
- Reads the provided API key
- Configures internal event handlers
- Prepares event collection mechanisms
- Enables communication with the BugLens backend

After initialization, error monitoring begins automatically.