export const normalizeIssue = (
    issue,
    realtime = false
) => ({
    id: issue.issue_id || crypto.randomUUID(),
    fingerprint: issue.fingerprint,
    title: issue.title || issue.message,
    severity: issue.severity || "error",
    status: issue.status || "unresolved",
    count: issue.count || 1,
    latest_browser:
        issue.latest_browser || issue.browser,
    latest_page:
        issue.latest_page || issue.page,
    last_seen:
        issue.last_seen || issue.timestamp,
    realtime
});