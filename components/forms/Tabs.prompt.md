One-line: Tabs inside a panel — the only navigation control that uses an underline.

```jsx
<Tabs tabs={['Details', 'Character', 'Consult', 'History']} value={tab} onChange={setTab} />
```

Notes
- The active underline is neutral `--qm-text-row`: tabs are location, not state, so they take no accent.
