import {addBreadcrumb} from './breadcrumbs.js'

export const setupErrorCapture = (sdk) =>{
    window.addEventListener("error",(event)=>{
        sdk.capture({
            type: "error",
            message: event.message || "Unknown Error",
            stack: event.error?.stack || null,
            page: location.href,
            payload: {
                lineno: event.lineno,
                colno: event.colno,
            },
        });
    });

    window.addEventListener("unhandledrejection",(event)=>{
        sdk.capture({
            type: "unhandledrejection",
            message:
                event.reason?.message ||
                "Unhandled Promise Rejection",

            stack: event.reason?.stack || null,

            page: location.href,
        });
    })

    const originalConsoleError = console.error;
    console.error = (...args) =>{
        sdk.capture({
            type: "console",
            message: args.join(" "),
            page: location.href,
        });
        originalConsoleError.apply(console, args);
    }

    const originalFetch = window.fetch;

    window.fetch = async (...args) => {

        const url = String(args[0]);

        if (url.includes("/ingest/collect")) {
            return originalFetch(...args);
        }

        try {
            const response = await originalFetch(...args);

            if(!response.ok){
                sdk.capture({
                    type: "network",
                    message: `HTTP ${response.status}`,
                    page: location.href,

                    payload: {
                        url: args[0],
                        status: response.status,
                    },
                });
            }
            return response
        } catch (error) {
            sdk.capture({
                type: "network",
                message: error.message,
                stack: error.stack,
                page: location.href,
            });

            throw error;
        }
    }

    addBreadcrumb("sdk", {
        message: "Capture initialized",
    });
}
