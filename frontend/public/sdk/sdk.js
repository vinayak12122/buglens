import { BugMonitorCore } from "./core.js";

(()=>{
    const script = document.querySelector(
        'script[src*="sdk.js"]'
    );
    const apiKey = script?.dataset?.apiKey;
    const endpoint = "http://localhost:2006/ingest/collect";

    if(!apiKey){
        throw new Error("BugMonitor: API Key missing");
    }

    const sdk = new BugMonitorCore({
        apiKey,
        endpoint,
        environment: "production",
    });

    window.BugMonitor = sdk;
})();