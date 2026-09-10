## 2025-01-20 - Memoized ClinicalMarkdown
**Learning:** `ClinicalMarkdown` is a heavy component that parses markdown and renders many custom React elements for each AST node. It was re-rendering unnecessarily during streaming responses in the chat interface, which slowed down the UI.
**Action:** Always consider wrapping computationally expensive components, especially those rendering large amounts of text or custom AST nodes like `react-markdown`, with `React.memo` if they are rendered frequently with identical props.
