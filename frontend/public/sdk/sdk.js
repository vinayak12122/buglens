import { BugMonitorCore } from "./core.js";

(() => {

    const scripts = [...document.scripts];

    const script = scripts.find(
        s => s.dataset.apiKey
    );

    const apiKey = script?.dataset?.apiKey;

    const endpoint =
        "https://buglens-tnzl.onrender.com/ingest/collect";

    if (!apiKey) {
        throw new Error(
            "BugMonitor: API Key missing"
        );
    }

    const sdk = new BugMonitorCore({
        apiKey,
        endpoint,
        environment: "production",
    });

    window.BugMonitor = sdk;

    console.log("SDK VERSION TEST 12345");
})();