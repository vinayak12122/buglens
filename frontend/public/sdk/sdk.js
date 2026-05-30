console.log("SDK FILE LOADED");
import { BugMonitorCore } from "./core.js";

console.log("THEN LOADING");

(() => {

    console.log("IIFE STARTED");

    const scripts = [...document.scripts];

    console.log("ALL SCRIPTS", scripts);

    const script = scripts.find(
        s => s.dataset.apiKey
    );

    console.log("FOUND SCRIPT", script);

    const apiKey = script?.dataset?.apiKey;

    console.log("API KEY", apiKey);

    const endpoint =
        "https://buglens-tnzl.onrender.com/ingest/collect";

    const sdk = new BugMonitorCore({
        apiKey,
        endpoint,
        environment: "production",
    });

    console.log("SDK CREATED", sdk);

    window.BugMonitor = sdk;

    console.log("WINDOW ASSIGNED");

})();