One-line: Says which promise the author is currently under — local draft, saving, or saved to QM write-once.

```jsx
<SaveStatus inline>Local draft</SaveStatus>
<SaveStatus state="saving" tag="POST">Saving — 1 document, 9 nodes, 2 events</SaveStatus>
<SaveStatus state="saved" tag="locked">Saved to QM · write-once</SaveStatus>
```

Notes
- Saving pulses at 1.4s; QM never spins.
- "Saved to QM" is a lock, not a success toast: v1 documents are write-once.
