EVAL_SET = [
    {   
        "question": "How does BugLens validate the API key on incoming events?",
        "relevant": ["backend/authentication.md", "docs/api_keys.md"],
    },
    {   
        "question": "What information is used to generate an error fingerprint?",
        "relevant": ["backend/fingerprinting.md", "issues/fingerprinting.md"],
    },
    {   
        "question": "Why is there a queue between ingestion and processing?",
        "relevant": ["backend/queues.md", "logs/queue_flow.md", "backend/architecture.md"],
    },
    {   
        "question": "What does a background worker do with a queued event?",
        "relevant": ["backend/workers.md", "logs/processing.md", "backend/architecture.md"],
    },
    {  
        "question": "How do I install the SDK?",
        "relevant": ["sdk/configuration.md", "docs/faq.md", "docs/installation.md"],
    },
    {   
        "question": "Which user actions does the SDK record as breadcrumbs?",
        "relevant": ["sdk/breadcrumbs.md", "docs/faq.md"],
    },
    {   
        "question": "How does the dashboard show new errors without a page refresh?",
        "relevant": ["logs/realtime_updates.md", "frontend/websocket.md", "backend/websocket.md"],
    },
    {   
        "question": "What happens to an issue when a resolved error occurs again?",
        "relevant": ["issues/issue_lifecycle.md", "issues/resolution_flow.md"],
    },
    {   
        "question": "Does BugLens need an npm package?",
        "relevant": ["docs/faq.md", "docs/installation.md"],
    },
    {   
        "question": "What are the current limitations of BugLens?",
        "relevant": ["product/limitations.md"],
    },
]