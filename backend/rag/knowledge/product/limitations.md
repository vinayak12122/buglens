# Current Limitations

BugLens currently has several limitations. This page lists what the platform does not support yet, on the frontend and on the backend.

## Frontend limitations

The current limitations of the BugLens frontend are:

- The cache is memory based, so it resets after a page refresh
- There is no IndexedDB persistence
- There is no service worker caching
- There is no virtualized rendering
- There is no React Query synchronization

## Backend limitations

The current limitations of the BugLens backend are:

- There is no Redis
- There is no Kafka
- There is no RabbitMQ
- There is no vector database
- There is no distributed worker orchestration

## Why these limitations exist

The current architecture prioritizes simplicity and maintainability while supporting the current requirements of the platform.