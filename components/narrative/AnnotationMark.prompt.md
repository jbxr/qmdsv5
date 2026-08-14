One-line: The mono signal chip that sits on a beat above its text — lint scores, tell warnings, cut markers, provenance.

```jsx
<AnnotationMark>lint 7·5</AnnotationMark>
<AnnotationMark>fn 0.9</AnnotationMark>
<AnnotationMark tone="advisory" glyph={<StateDot state="proposed" size={6} />}>tell warning</AnnotationMark>
<AnnotationMark tone="damaged">cut mid-clause</AnnotationMark>
<AnnotationMark tone="unparsed">lint unparsed</AnnotationMark>
```

Notes
- Signals sit on the material, never in a rail, so they survive into any view.
- `unparsed` must stay dashed: a signal that could not be read is never zero.
- `provenance` is the quiet violet `soul` / grey `qm` tag — never a status colour.
- Every prop the chip does not claim reaches the `<span>`, so `title`, `aria-*` and `data-*` behave natively.
