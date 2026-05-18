import { SDK_CONFIG } from "./config.js";
import { EventQueue } from "./queue.js";
import { Transport } from "./transport.js";
import {getBrowserInfo,nowISO,safeStringify} from './utils.js'
import {getBreadcrumbs,initBreadcrumbs} from './breadcrumbs.js'
import { setupErrorCapture } from "./capture.js";

export class BugMonitorCore {
    constructor(config) {
        if (!config.apiKey) {
            throw new Error("BugMonitor: Missing API Key");
        }

        this.apiKey = config.apiKey;
        // this.projectId = config.projectId;
        this.endpoint = config.endpoint;
        this.environment = config.environment || "production";

        this.queue = new EventQueue();

        this.transport = new Transport({
            endpoint: this.endpoint,
            apiKey: this.apiKey,
        });

        // this.lastEvent = null;
        // this.lastEventTime = 0;

        this.isFlushing = false;

        this.init();
    }

    init(){
        initBreadcrumbs()
        setupErrorCapture(this);
        setInterval(() => {

            if (this.queue.size() > 0) {
                this.flush();
            }

        }, SDK_CONFIG.FLUSH_INTERVAL);
    }

    capture(data) {
        const event = {
            type: data.type || "error",
            message: data.message || "Unknown Error",
            stack: data.stack || null,
            page: data.page || location.href,
            browser: getBrowserInfo(),

            payload: safeStringify(data.payload || {}),

            breadcrumbs: getBreadcrumbs(),

            sdk: {
                version: SDK_CONFIG.SDK_VERSION,
                environment: this.environment,
            },

            timestamp: nowISO(),
        };

        this.queue.add(event);

        // instant flush for important errors
        if (
            event.type === "error" ||
            event.type === "unhandledrejection" ||
            event.type === "network"
        ) {
            this.flush();
        }
    }

    async flush() {

        if (this.isFlushing) return;

        if (this.queue.size() === 0) {
            return;
        }

        this.isFlushing = true;

        const batch = this.queue.getBatch();

        const success = await this.transport.send(batch);

        if (!success) {
            this.queue.requeue(batch);
        }

        this.isFlushing = false;
    }
}