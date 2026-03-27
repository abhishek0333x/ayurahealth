---
name: owasp-security
description: OWASP Top 10:2025 + ASVS 5.0 + Agentic AI security audit. Scans against all 10 OWASP categories with severity reporting.
user-invocable: true
tools: [read, grep, shell]
---

# OWASP Security Skill

This skill provides comprehensive security auditing based on OWASP Top 10:2025, ASVS 5.0, and Agentic AI security guidelines.

## OWASP Top 10:2025

**1. Broken Access Control** — Users can act outside their intended permissions. Check authorization on all sensitive operations, role-based access control, and permission enforcement.

**2. Cryptographic Failures** — Sensitive data exposed due to weak encryption or missing protection. Verify HTTPS, encryption at rest, secure key management, and data classification.

**3. Injection** — Untrusted data interpreted as code (SQL, NoSQL, command injection). Validate and sanitize all inputs, use parameterized queries, avoid dynamic query construction.

**4. Insecure Design** — Missing security controls in architecture. Review threat modeling, security requirements, and design patterns.

**5. Security Misconfiguration** — Default credentials, unnecessary features enabled, outdated components. Audit configuration, dependencies, and deployment settings.

**6. Vulnerable and Outdated Components** — Using libraries with known vulnerabilities. Run dependency audits, update regularly, monitor for CVEs.

**7. Authentication & Session Management Failures** — Weak credentials, session fixation, credential exposure. Verify password policies, session handling, MFA, and secure storage.

**8. Software and Data Integrity Failures** — Insecure CI/CD, unsigned updates, malicious dependencies. Verify code signing, dependency verification, and update mechanisms.

**9. Logging & Monitoring Failures** — Insufficient logging of security events. Implement comprehensive logging, alerting, and incident response procedures.

**10. Server-Side Request Forgery (SSRF)** — Application fetches remote resources without validation. Validate URLs, restrict outbound connections, use allowlists.

## ASVS 5.0 Categories

**V1: Architecture, Design and Threat Modeling** — Security by design, threat models, secure architecture patterns

**V2: Authentication** — Password policies, MFA, session management, credential storage

**V3: Session Management** — Session tokens, timeout, fixation prevention, CSRF protection

**V4: Access Control** — Authorization, role-based access, permission enforcement, privilege escalation prevention

**V5: Validation, Sanitization and Encoding** — Input validation, output encoding, file upload security

**V6: Stored Cryptography** — Encryption at rest, key management, secure algorithms

**V7: Error Handling and Logging** — Secure error messages, comprehensive logging, sensitive data protection

**V8: Data Protection** — PII protection, data classification, secure deletion, GDPR compliance

**V9: Communications** — TLS/SSL, certificate validation, secure APIs, CORS configuration

**V10: Malicious Code** — Dependency scanning, code review, supply chain security

**V11: Business Logic** — Workflow validation, rate limiting, fraud prevention

**V12: Files and Resources** — File upload validation, path traversal prevention, resource limits

**V13: API and Web Service** — API authentication, rate limiting, input validation, error handling

**V14: Configuration** — Security headers, default credentials, debug mode disabled, dependency updates

## Agentic AI Security (ASI01-ASI10)

**ASI01: Prompt Injection** — Prevent malicious prompts from manipulating AI behavior. Validate user inputs, use system prompts carefully, implement prompt filtering.

**ASI02: Insecure Tool Integration** — AI tools with excessive permissions. Implement principle of least privilege, validate tool outputs, restrict tool access.

**ASI03: Insecure Plugin/Extension** — Third-party plugins with vulnerabilities. Audit plugins, verify sources, implement sandboxing.

**ASI04: Insufficient Output Filtering** — AI generating harmful content. Implement output validation, content filtering, human review for sensitive operations.

**ASI05: Excessive Agency** — AI making decisions without human oversight. Implement approval workflows, audit trails, human-in-the-loop for critical actions.

**ASI06: Insecure API Integration** — APIs called by AI without proper authentication. Verify API credentials, validate responses, implement rate limiting.

**ASI07: Inadequate Error Handling** — AI errors exposing sensitive information. Implement secure error handling, logging, and recovery mechanisms.

**ASI08: Insecure Model Access** — Unauthorized access to AI models. Implement authentication, authorization, API key rotation, access logging.

**ASI09: Inadequate Model Monitoring** — Undetected AI misuse or attacks. Implement monitoring, alerting, anomaly detection, audit trails.

**ASI10: Insecure Model Update** — Malicious model updates or poisoning. Verify model integrity, implement version control, validate updates before deployment.

## Security Audit Checklist

**Authentication & Authorization:**
- [ ] Passwords hashed with strong algorithms (bcrypt, Argon2)
- [ ] MFA implemented for sensitive accounts
- [ ] Session tokens secure and properly validated
- [ ] Role-based access control (RBAC) implemented
- [ ] No privilege escalation vulnerabilities
- [ ] API authentication required for all endpoints

**Input Validation:**
- [ ] All user inputs validated on server-side
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (output encoding)
- [ ] CSRF tokens implemented
- [ ] File upload validation (type, size, content)
- [ ] Rate limiting on sensitive endpoints

**Data Protection:**
- [ ] HTTPS/TLS for all communications
- [ ] Sensitive data encrypted at rest
- [ ] Secure key management
- [ ] No hardcoded secrets or credentials
- [ ] PII properly classified and protected
- [ ] Data retention policies implemented

**Error Handling & Logging:**
- [ ] Secure error messages (no stack traces to users)
- [ ] Comprehensive security logging
- [ ] Sensitive data not logged
- [ ] Log retention and archival
- [ ] Alerting for security events
- [ ] Incident response procedures

**Dependencies & Updates:**
- [ ] Regular dependency audits
- [ ] Known vulnerabilities patched
- [ ] Outdated components updated
- [ ] Supply chain security verified
- [ ] Code signing and integrity checks
- [ ] Automated security scanning

**Configuration & Deployment:**
- [ ] Security headers configured (CSP, X-Frame-Options, etc.)
- [ ] Debug mode disabled in production
- [ ] Default credentials changed
- [ ] Unnecessary services disabled
- [ ] WAF (Web Application Firewall) configured
- [ ] DDoS protection enabled

## Severity Levels

**CRITICAL** — Immediate exploitation risk, data breach likely, must fix immediately

**HIGH** — Significant security impact, exploitation probable, fix before deployment

**MEDIUM** — Moderate security impact, exploitation possible, fix in next release

**LOW** — Minor security impact, exploitation unlikely, address in future updates

## When to Use This Skill

- "Security audit this codebase"
- "Check for vulnerabilities"
- "Review auth implementation"
- "Verify OWASP compliance"
- "Audit API security"
- "Check for injection vulnerabilities"

## Example: AyuraHealth Security

**Focus Areas:** Authentication (user accounts), Data protection (health data), API security (chat endpoint), Input validation (user inputs), Logging (security events)

**Compliance:** HIPAA-ready (health data), GDPR-compliant (user privacy), OWASP Top 10 protection

**Monitoring:** Security logging, anomaly detection, incident response procedures

