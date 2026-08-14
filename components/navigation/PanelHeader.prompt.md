One-line: The header that tells the author who can hear what is inside a panel.

```jsx
<PanelHeader audience="scene" label="IN SCENE" note="everyone in the room hears this">
  <span style={{ fontFamily: 'var(--qm-font-mono)' }}>4 turns</span>
</PanelHeader>
<PanelHeader audience="private" label="PRIVATE" note="off-stage · nothing below is witnessed" />
<PanelHeader label="TIMELINE" />
```

Notes
- Audience never becomes another accent colour: warm surface = room, cool + dashed = private.
- The note is written in plain language, lower case, no jargon.
