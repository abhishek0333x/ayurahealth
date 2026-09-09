## 2026-09-09 - SSRF Vulnerability in Link Fetcher
**Vulnerability:** The `/api/fetch-link` endpoint directly fetched user-provided URLs without validating if the hostname resolved to private networks or localhost.
**Learning:** `fetch` follows redirects by default, which can be exploited to bypass initial hostname validation if the remote server redirects to a local IP. Regular expressions used for validation can also be bypassed using trailing dots or IPv6 bracket notation.
**Prevention:** Explicitly configure fetch options with `redirect: 'error'` or `redirect: 'manual'` to prevent redirect bypasses, and sanitize the hostname by removing trailing dots and IPv6 brackets before running regex validation.
