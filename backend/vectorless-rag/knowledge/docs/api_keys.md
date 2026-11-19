# API Keys

## Overview

BugLens uses project-specific public API keys to identify the destination project for incoming events.

Every SDK installation must provide a valid API key.

## Purpose

API keys allow BugLens to:

- Identify projects
- Associate events with the correct project
- Prevent unauthorized event ingestion
- Maintain project isolation

## Usage

The API key is provided through the SDK script tag.

Example:

<script
    src="https://buglens-two.vercel.app/sdk/sdk.js"
    data-api-key="YOUR_API_KEY"
>
</script>

## Validation

When an event reaches the BugLens backend, the provided API key is validated before processing begins.

Invalid API keys result in the event being rejected.

## Security Notes

Public API keys are intended only for identifying projects.

They should not be treated as authentication credentials for dashboard access or account management.