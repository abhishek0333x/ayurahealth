## 2024-05-24 - Add ARIA Labels to ChatComposer
**Learning:** Icon-only buttons without ARIA labels are inaccessible to screen readers. This pattern is common in chat interfaces for attachments, links, and voice inputs.
**Action:** Always add `aria-label` or `title` to buttons that contain only icons.
