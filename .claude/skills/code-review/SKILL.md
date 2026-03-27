---
name: code-review
description: Multi-language code reviewer covering React 19, TypeScript, Python, Go, Rust, and more. 4-phase review with severity labels and language-specific guides.
user-invocable: true
tools: [read, grep]
---

# Code Review Skill

This skill provides comprehensive code reviews across multiple languages using a 4-phase approach with severity labels and language-specific guidance.

## 4-Phase Review Process

**Phase 1: Context Gathering** — Understand the purpose, requirements, and constraints of the code. Ask clarifying questions about the business logic and design decisions.

**Phase 2: Architecture Check** — Evaluate the overall structure, design patterns, separation of concerns, and scalability. Check for architectural anti-patterns.

**Phase 3: Line-by-Line Review** — Examine code quality, readability, performance, security, and error handling. Look for bugs, edge cases, and improvements.

**Phase 4: Summary** — Provide a concise summary of findings, prioritized by severity, with actionable recommendations.

## Severity Labels

**[blocking]** — Must fix before merge. Security vulnerabilities, critical bugs, or architectural issues.

**[important]** — Should fix before merge. Performance issues, maintainability concerns, or design improvements.

**[nit]** — Nice to fix. Code style, formatting, or minor improvements.

**[suggestion]** — Consider for future. Educational suggestions or alternative approaches.

**[learning]** — Learning opportunity. Explanation of best practices or patterns.

**[praise]** — Positive feedback. Acknowledge good code, clever solutions, or improvements.

## Language-Specific Guides

**React 19:**
- Hooks rules (dependencies, cleanup)
- Component composition and reusability
- Performance optimization (memo, useMemo, useCallback)
- Accessibility (ARIA, keyboard navigation)
- Error boundaries and error handling

**TypeScript:**
- Type safety and inference
- Generics and utility types
- Interface vs Type
- Strict mode compliance
- Type narrowing and guards

**Python:**
- PEP 8 compliance
- Type hints and mypy
- Exception handling
- Docstrings and documentation
- Performance and memory usage

**Go:**
- Error handling patterns
- Goroutines and channels
- Interface design
- Package structure
- Testing and benchmarks

**Rust:**
- Ownership and borrowing
- Error handling (Result, Option)
- Trait design
- Performance and safety
- Memory efficiency

## Code Review Checklist

**Correctness:**
- [ ] Code does what it's supposed to do
- [ ] Edge cases are handled
- [ ] Error handling is appropriate
- [ ] No obvious bugs or logic errors

**Performance:**
- [ ] No unnecessary loops or recursion
- [ ] Efficient algorithms and data structures
- [ ] No memory leaks or excessive allocations
- [ ] Appropriate caching or memoization

**Security:**
- [ ] Input validation and sanitization
- [ ] No hardcoded secrets or credentials
- [ ] Proper authentication and authorization
- [ ] Protection against common vulnerabilities

**Maintainability:**
- [ ] Clear, descriptive variable and function names
- [ ] Appropriate comments and documentation
- [ ] DRY principle (Don't Repeat Yourself)
- [ ] Proper separation of concerns

**Testing:**
- [ ] Unit tests for critical functions
- [ ] Edge cases covered by tests
- [ ] Integration tests where appropriate
- [ ] Test coverage > 80%

**Accessibility (for frontend code):**
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Alt text on images
- [ ] ARIA labels on custom components
- [ ] Color contrast meets WCAG AA

## Golden Rules

1. **Ask Questions, Don't Command** — Use collaborative language: "Have you considered...?" instead of "You should..."

2. **Always Explain WHY** — Don't just point out issues; explain the reasoning behind recommendations.

3. **Be Specific** — Reference line numbers, provide examples, suggest specific improvements.

4. **Balance Praise and Critique** — Acknowledge good code and improvements alongside suggestions.

5. **Consider Context** — Understand deadlines, requirements, and constraints before suggesting major refactors.

## When to Use This Skill

- "Review this PR"
- "Check this code for security issues"
- "Review my React components"
- "Audit this Python script"
- "Is this code production-ready?"

## Example: AyuraHealth Code Review

**Language:** TypeScript + React 19
**Focus Areas:** Type safety, component composition, performance, accessibility, security
**Testing:** Unit tests for API calls, integration tests for user flows
**Performance:** Optimize re-renders, use memo for expensive components
**Accessibility:** Ensure keyboard navigation, focus states, ARIA labels

