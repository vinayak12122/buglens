import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "./sdk.js",
            name: "BugLens",
            fileName: "buglens",
            formats: ["iife"]
        }
    }
});