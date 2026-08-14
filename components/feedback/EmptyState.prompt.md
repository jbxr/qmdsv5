One-line: The three ways a QM surface can have nothing to show — and none of them is an error.

```jsx
<EmptyState>The room is quiet. Press ⏎ to let it begin.</EmptyState>
<EmptyState kind="offline">Room offline — writing is unaffected.</EmptyState>
<EmptyState kind="unknown" icon={<Icon name="help" size={14} />}>
  <span style={{ color: 'var(--qm-text-emph)' }}>Unknown is not empty.</span> Couldn't read this scene's drafts — opening still works.
</EmptyState>
```

Notes
- Dashed border is reserved for unknown: a thing that could not be read must never look like zero.
