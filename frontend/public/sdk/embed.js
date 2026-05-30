(async () => {

    const script = document.currentScript;

    const apiKey = script?.dataset?.apiKey;

    window.__BUGLENS_API_KEY__ = apiKey;

    await import("./sdk.js");

})();