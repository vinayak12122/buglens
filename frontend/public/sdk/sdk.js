console.log("SDK FILE LOADED");

import { BugMonitorCore } from "./core.js";

(() => {

    const apiKey = window.__BUGLENS_API_KEY__;

    const endpoint =
        "https://buglens-tnzl.onrender.com/ingest/collect";

    const sdk = new BugMonitorCore({
        apiKey,
        endpoint,
        environment: "production",
    });

    window.BugMonitor = sdk;

})();