import { SDK_CONFIG } from "./config.js";

export class Transport {
    constructor({ endpoint, apiKey }) {
        this.endpoint = endpoint;
        this.apiKey = apiKey;
    }

    async send(events) {
        if (!Array.isArray(events) || events.length === 0) {
            return true;
        }

        try {
            const response = await fetch(this.endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Public-Key": this.apiKey,
                },
                body: JSON.stringify({ events }),
                keepalive: true,
            });

            return response.ok;

        } catch (error) {
            console.error(
                "BugMonitor Transport Error:",
                error
            );
            return false;
        }
    }
}