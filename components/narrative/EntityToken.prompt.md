One-line: A reference to a person, place or artifact — inline inside prose, or as a cast chip in a rail.

```jsx
<p>… <EntityToken variant="inline" name="Sarita Fernandes" /> reads the letter aloud</p>
<EntityToken initials="VN" name="vera" role="Ensign" onDismiss={drop} />
<EntityToken name="Luna Station" initials="LS" kind="location" />
```

Notes
- Inline mentions keep prose weight: colour plus a hairline underline, never a button.
- Accepting a mention from the `@` picker inserts the canonical label, never the alias.
- `role` is the narrative rank ("Ensign"), not the ARIA role. The props omit the DOM
  `role` attribute, so you cannot pass one through: when a token needs a semantic role,
  wrap it or use `aria-label`, which is still accepted.
- The token is a control only with `onClick`, and the ✕ is always one of its own: it has its own
  tab stop and its own ring, and ⏎ on it dismisses without also firing the token.
