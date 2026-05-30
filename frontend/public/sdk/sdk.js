console.log("SDK FILE LOADED");

import { BugMonitorCore } from "./core.js";

(() => {

    const scripts = [...document.scripts];

    const script = scripts.find(
        s => s.dataset.apiKey
    );

    const apiKey = script?.dataset?.apiKey;

    const endpoint =
        "https://buglens-tnzl.onrender.com/ingest/collect";

    const sdk = new BugMonitorCore({
        apiKey,
        endpoint,
        environment: "production",
    });

    window.BugMonitor = sdk;

})();