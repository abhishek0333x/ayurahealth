## 2024-05-15 - Prevented Server-Side Request Forgery in fetch-link
**Vulnerability:** The /api/fetch-link/route.ts endpoint blindly fetched any user-provided URL without validating its protocol or hostname, allowing SSRF (Server-Side Request Forgery) attacks.
**Learning:** In Next.js server-side API routes, fetching user-provided URLs must always include strict hostname validation to prevent access to cloud metadata (e.g., 169.254.169.254) and internal networks (e.g., 127.0.0.1, localhost).
**Prevention:** Always parse URLs using the `URL` constructor, enforce `http:`/`https:` protocols, and block private IP address ranges and hostnames before calling `fetch()` on user input. Sanitize the hostname to strip trailing dots or IPv6 brackets before running regex checks to prevent bypasses.
