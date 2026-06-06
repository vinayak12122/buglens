# Troubleshooting

## Events Not Appearing

If events are not appearing in the dashboard:

Check the following:

- SDK script is loaded successfully
- API key is valid
- Project exists
- Browser console does not show SDK loading errors

## Invalid API Key

If the provided API key is invalid:

- Verify the API key value
- Ensure the key belongs to the correct project
- Confirm there are no typing mistakes

Events using invalid keys will be rejected by the backend.

## Dashboard Not Updating

If new events are not appearing immediately:

- Refresh the dashboard
- Verify internet connectivity
- Confirm WebSocket connections are active

## No Errors Being Captured

Verify that:

- The SDK is installed correctly
- The application is generating supported error events
- The SDK script is loaded before testing

## Additional Investigation

Browser developer tools can help identify:

- Script loading failures
- Network request failures
- Console errors
- Connectivity issues