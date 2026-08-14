One-line: A reference to a person, place or artifact — inline inside prose, or as a cast chip in a rail.

```jsx
<p>… <EntityToken variant="inline" name="Sarita Fernandes" /> reads the letter aloud</p>
<EntityToken initials="VN" name="vera" role="Ensign" onDismiss={drop} />
<EntityToken name="Luna Station" initials="LS" kind="location" />
```

Notes
- Inline mentions keep prose weight: colour plus a hairline underline, never a button.
- Accepting a mention from the `@` picker inserts the canonical label, never the alias.
