## 2024-05-24 - SSRF in fetch-link API
**Vulnerability:** The `/api/fetch-link` endpoint was using `fetch()` directly on a user-provided URL string without validating the protocol or hostname, allowing for Server-Side Request Forgery (SSRF) to query internal IPs (like AWS metadata `169.254.169.254` or `localhost`).
**Learning:** Always explicitly parse user-provided URLs using `new URL()` and validate both the protocol (`http:` / `https:`) and the hostname against a blocklist of internal IP ranges/domains before passing them to server-side `fetch` or HTTP clients in Next.js APIs.
**Prevention:** Added robust URL parsing and regex checks against `localhost`, `127.0.0.1`, `169.254.169.254`, and private IP CIDRs. Ensured the hostname is sanitized to prevent trailing dot bypasses.

## 2024-05-24 - SSRF Redirect & IPv6 bypasses
**Vulnerability:** A simple IP/hostname blocklist check on the initial URL is insufficient to prevent SSRF if `fetch` is allowed to automatically follow redirects to internal IPs, or if IPv6 brackets are stripped before validation.
**Learning:** In addition to validating the parsed hostname against internal ranges (accounting for both `[::1]` and `::1`), `fetch()` calls in Next.js APIs must explicitly set `redirect: 'error'` or `redirect: 'manual'` if the redirect chain itself is not being recursively validated.
**Prevention:** Updated the SSRF filter to include `::1` in the regex and configured the `fetch` options with `redirect: 'error'` to completely prevent redirection-based bypasses.
