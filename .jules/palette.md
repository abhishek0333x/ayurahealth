## 2024-09-08 - Icon-only buttons lacking ARIA labels
**Learning:** Found several icon-only buttons in the application (like ChatComposer attachment and link buttons, and NewsletterSignup submit icons if any) that don't have `aria-label`s. This is a common accessibility anti-pattern that makes screen readers unable to interpret the action.
**Action:** Always add `aria-label` to buttons that only contain an icon, describing what the button does.
