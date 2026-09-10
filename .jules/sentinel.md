## 2026-09-10 - SSRF Vulnerability in fetch-link
**Vulnerability:** The `/app/api/fetch-link/route.ts` endpoint blindly fetched any URL provided by the user, leading to Server-Side Request Forgery (SSRF).
**Learning:** Internal endpoints or metadata services (e.g., AWS metadata at 169.254.169.254) can be accessed by an attacker if user-supplied URLs are fetched directly without validation.
**Prevention:** Validate parsed hostnames against internal/private IP blocks. When dealing with Next.js `fetch()`, use `redirect: 'manual'` and implement a loop to re-validate the parsed hostname of each new hop to prevent redirect SSRF bypasses.
