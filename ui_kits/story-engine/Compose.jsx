const { Button, Icon, StateDot, AnnotationMark, BeatSpine, Card, TopBar } = window.QuantumMateriaDesignSystem_488cde;

function Compose({ onExit }) {
  const [current, setCurrent] = React.useState(1);
  const [marks, setMarks] = React.useState({ '2-1': 'highlight' });
  const mark = (key, kind) => setMarks((m) => ({ ...m, [key]: m[key] === kind ? undefined : kind }));
  const beats = window.QM_COMPOSE_BEATS.map((b) => ({ n: b.n, text: b.text, state: b.n === current ? 'here' : 'written', meta: <><StateDot state="canon" size={7} /><span>slot {b.slot}</span></> }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--qm-surface-shell)' }}>
      <TopBar tall brand={false}>
        <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 11.5, letterSpacing: 'var(--qm-ls-module)', color: 'var(--qm-text-6)', marginRight: 6 }}>COMPOSE</span>
        <span style={{ fontFamily: 'var(--qm-font-serif)', fontSize: 18, color: 'var(--qm-prose-2)' }}>Luna Station Dome and Tunnel</span>
        <span style={{ fontSize: 13, color: 'var(--qm-text-5)' }}>E1 · submitted</span>
        <AnnotationMark tone="good">pre-selected: ranked winner, slot 1</AnnotationMark>
        <span style={{ flex: 1 }} />
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--qm-scene-text)' }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(232,220,192,0.55)' }} />1 highlighted
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--qm-text-5)' }}>
          <span style={{ width: 10, height: 2, background: 'var(--qm-text-6)' }} />1 struck
        </span>
        <Button variant="primary">Compose master</Button>
        <Button onClick={onExit}>Exit</Button>
      </TopBar>

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div className="qm-scroll" style={{ width: 268, flex: 'none', overflowY: 'auto', background: 'var(--qm-surface-panel)', borderRight: '1px solid var(--qm-border-panel)', padding: '14px 12px' }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: 'var(--qm-ls-mono)', color: 'var(--qm-text-5)', padding: '4px 8px 12px' }}>BEATS · 7</div>
          <BeatSpine showSpine={false} beats={beats} onSelect={(b) => setCurrent(b.n)} />
        </div>

        <div style={{ flex: 1, minWidth: 0, display: 'flex', background: 'var(--qm-surface-rail)' }}>
          {window.QM_CANDIDATES.map((col) => (
            <div key={col.slot} style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', borderRight: col.slot < 2 ? '1px solid var(--qm-border-group)' : 'none', background: col.ranked ? '#131A22' : 'transparent' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
                borderBottom: col.ranked ? '1px solid var(--qm-border-teal)' : '1px solid var(--qm-border-panel)',
                background: col.ranked ? 'linear-gradient(180deg,#17222A,#141C24)' : 'var(--qm-surface-panel)',
                boxShadow: col.ranked ? 'inset 0 2px 0 var(--qm-teal)' : 'none'
              }}>
                <Icon name="grip" size={13} color="var(--qm-text-8)" />
                <span style={{ fontSize: 13.5, color: col.ranked ? 'var(--qm-text-1)' : 'var(--qm-text-2)' }}>slot {col.slot}</span>
                <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 12, color: 'var(--qm-text-6)' }}>{col.run}</span>
                {col.ranked
                  ? <AnnotationMark tone="advisory">{col.rank}</AnnotationMark>
                  : <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 12, color: 'var(--qm-text-6)' }}>{col.rank}</span>}
                <span style={{ flex: 1 }} />
                <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 12.5, color: col.chosen[0] === '0' ? 'var(--qm-text-6)' : 'var(--qm-teal-text)' }}>{col.chosen}</span>
              </div>

              <div className="qm-scroll" style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
                {col.slot === 0 ? (
                  <div style={{ marginBottom: 18, fontFamily: 'var(--qm-font-serif)', fontSize: 16, lineHeight: 1.7, color: 'var(--qm-prose-5)' }}>
                    The corridor beyond the viewport stayed empty. Briggs logged a secure check at 0915.{' '}
                    <span style={{ background: 'rgba(232,220,192,0.16)', boxShadow: 'inset 0 -1px 0 rgba(232,220,192,0.5)' }}>Then 0930. 0945. 1000. Each time he entered the code, watched the green confirm flash on his wrist display.</span>{' '}
                    The apparatus did not move.
                  </div>
                ) : null}

                {col.beats.map((b, i) => {
                  const key = col.slot + '-' + i;
                  const state = marks[key];
                  return (
                    <div key={key} style={{
                      borderRadius: 9, border: `1px solid ${b.cut ? 'var(--qm-border-cinnabar)' : b.chosen ? 'var(--qm-border-teal)' : 'var(--qm-border-panel)'}`,
                      background: 'var(--qm-surface-raised)', overflow: 'hidden', marginBottom: 14,
                      boxShadow: b.chosen ? 'inset 3px 0 0 var(--qm-teal)' : 'none'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '10px 14px', borderBottom: '1px solid var(--qm-border-group)' }}>
                        <span style={{
                          width: 20, height: 20, borderRadius: 5, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          background: b.chosen ? 'rgba(85,183,166,0.20)' : 'transparent',
                          border: `1px solid ${b.chosen ? 'var(--qm-border-teal-strong)' : 'rgba(255,255,255,0.18)'}`
                        }}>{b.chosen ? <Icon name="check" size={12} color="var(--qm-teal-text)" strokeWidth={2.4} /> : null}</span>
                        <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 12.5, color: b.chosen ? 'var(--qm-text-2)' : 'var(--qm-text-3)' }}>{b.beat}</span>
                        <AnnotationMark>lint {b.lint}</AnnotationMark>
                        {b.tell ? <AnnotationMark tone={b.tell === 'critical' ? 'damaged' : 'advisory'}>tell {b.tell}</AnnotationMark> : null}
                        {b.cut ? (
                          <AnnotationMark tone="damaged" glyph={<span style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderBottom: '8px solid var(--qm-cinnabar)' }} />}>cut mid-clause</AnnotationMark>
                        ) : null}
                        {b.fn ? <AnnotationMark>fn {b.fn}</AnnotationMark> : null}
                        <span style={{ flex: 1 }} />
                        <span style={{ width: 22, height: 22, borderRadius: 5, border: '1px solid rgba(255,255,255,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11.5, color: 'var(--qm-text-4)', cursor: 'pointer' }}>i</span>
                      </div>
                      <div style={{ padding: 14, fontFamily: 'var(--qm-font-serif)', fontSize: 16, lineHeight: 1.7, color: 'var(--qm-prose-4)' }}>
                        <span style={{
                          background: state === 'highlight' ? 'rgba(232,220,192,0.16)' : b.selectable ? 'rgba(95,168,188,0.18)' : 'transparent',
                          boxShadow: state === 'highlight' ? 'inset 0 -1px 0 rgba(232,220,192,0.5)' : 'none',
                          color: state === 'strike' ? 'var(--qm-text-8)' : undefined,
                          textDecoration: state === 'strike' ? 'line-through' : undefined
                        }}>{b.text}</span>
                      </div>
                      {b.selectable ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderTop: '1px solid var(--qm-border-group)' }}>
                          <Button variant="scene" size="tiny" hint="H" onClick={() => mark(key, 'highlight')} leadingIcon={<Icon name="highlighter" size={12} />}>Highlight</Button>
                          <Button size="tiny" hint="X" onClick={() => mark(key, 'strike')}>Strike</Button>
                          <span style={{ flex: 1 }} />
                          <Icon name="x" size={13} color="var(--qm-text-7)" />
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 18px', borderTop: '1px solid var(--qm-border-panel)', background: 'var(--qm-surface-status)', fontSize: 13.5, color: 'var(--qm-text-6)' }}>
        <span style={{ color: 'var(--qm-text-emph)' }}>Annotate, don’t rank.</span>
        <span>lint and fn are deterministic signals, not judgements — nothing here sorts on an aggregate.</span>
        <span style={{ flex: 1 }} />
        <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 12.5 }}>lint unparsed ≠ 0 findings</span>
      </div>
    </div>
  );
}

Object.assign(window, { Compose });
