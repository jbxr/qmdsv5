const { Button, Icon, Avatar, Card, EraChip, Field, AnnotationMark, TopBar } = window.QuantumMateriaDesignSystem_488cde;

function NewScene({ onBack, onEnter }) {
  const [cast, setCast] = React.useState(['vera', 'cade-briggs']);
  const chosen = window.QM_ROSTER.filter((r) => cast.includes(r.id));
  const toggle = (id) => setCast((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--qm-surface-shell)' }}>
      <TopBar breadcrumb="New scene">
        <Button onClick={onBack}>Cancel</Button>
      </TopBar>
      <div className="qm-scroll" style={{ flex: 1, overflowY: 'auto', background: 'radial-gradient(900px 480px at 50% -10%, #1A232D 0%, #10161C 65%)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 40, padding: '44px 60px 52px', minHeight: 620 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 28 }}>
              <span style={{ fontFamily: 'var(--qm-font-serif)', fontSize: 30, color: 'var(--qm-prose-1)' }}>New scene</span>
              <span onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13.5, color: 'var(--qm-text-6)', cursor: 'pointer' }}>
                <Icon name="arrowLeft" size={13} />back to the writing room
              </span>
            </div>

            <Field label="Title" kind="serif" value="Vera & Cade — the corridor" style={{ marginBottom: 24 }} />

            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 7 }}>
                <span style={{ fontSize: 13, color: 'var(--qm-text-6)' }}>Cast</span>
                <span style={{ fontSize: 13, color: 'var(--qm-text-6)' }}>{cast.length} chosen · 18 in the catalogue</span>
              </div>
              <div style={{ borderRadius: 8, background: 'var(--qm-surface-panel)', border: '1px solid var(--qm-border-control-quiet)', overflow: 'hidden' }}>
                <div style={{ height: 42, display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px', borderBottom: '1px solid var(--qm-border-group)', fontSize: 14, color: 'var(--qm-text-7)' }}>
                  search characters…<span style={{ flex: 1 }} /><span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 12, color: 'var(--qm-text-8)' }}>18</span>
                </div>
                {window.QM_ROSTER.map((r) => {
                  const on = cast.includes(r.id);
                  return (
                    <div key={r.id} onClick={() => toggle(r.id)}
                      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderBottom: '1px solid var(--qm-border-list)', cursor: 'pointer', background: on ? 'rgba(85,183,166,0.05)' : 'transparent' }}>
                      <span style={{
                        width: 20, height: 20, flex: 'none', borderRadius: 5, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        color: on ? 'var(--qm-teal-text)' : 'var(--qm-text-6)',
                        background: on ? 'rgba(85,183,166,0.18)' : 'transparent',
                        border: `1px solid ${on ? 'var(--qm-border-teal-strong)' : 'rgba(255,255,255,0.14)'}`
                      }}>
                        <Icon name={on ? 'check' : 'plus'} size={12} strokeWidth={on ? 2.4 : 2} />
                      </span>
                      <span style={{ fontSize: 14.5, color: 'var(--qm-text-field)' }}>{r.name}</span>
                      <span style={{ fontSize: 13, color: 'var(--qm-text-7)' }}>{r.rank}</span>
                      <span style={{ flex: 1 }} />
                      <AnnotationMark tone={r.src === 'soul' ? 'provenance' : 'measure'}>{r.src}</AnnotationMark>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 13, color: 'var(--qm-text-6)', marginBottom: 7 }}>Story-time</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 13.5, color: 'var(--qm-text-6)' }}>Y</span>
                  <Field kind="mono" value="−6" width={92} size="sm" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 13.5, color: 'var(--qm-text-6)' }}>D</span>
                  <Field kind="mono" value="1" width={92} size="sm" />
                </div>
                <span style={{ fontSize: 13.5, color: 'var(--qm-text-7)' }}>Leave both blank for the latest canon.</span>
              </div>
            </div>
          </div>

          <Card surface="selected" padding={24} style={{ alignSelf: 'start' }}>
            <div style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 11.5, letterSpacing: 'var(--qm-ls-module)', color: 'var(--qm-text-6)', marginBottom: 14 }}>YOU ARE ABOUT TO ENTER</div>
            <div style={{ fontFamily: 'var(--qm-font-serif)', fontSize: 24, lineHeight: 1.3, color: 'var(--qm-prose-1)', marginBottom: 16 }}>Vera &amp; Cade — the corridor</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <EraChip>Y−6 D1</EraChip>
              <span style={{ fontSize: 13.5, color: 'var(--qm-text-5)' }}>Luna Station · six years before</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {chosen.map((c) => (
                <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Avatar initials={c.initials} />
                  <span style={{ fontSize: 14, color: 'var(--qm-text-3)' }}>{c.name}</span>
                  <span style={{ fontSize: 13, color: 'var(--qm-text-7)' }}>{c.rank}</span>
                </div>
              ))}
              {chosen.length === 0 ? <span style={{ fontSize: 13.5, color: 'var(--qm-text-7)' }}>No one yet.</span> : null}
            </div>
            <Button variant="primary" size="lg" fullWidth disabled={chosen.length === 0} onClick={chosen.length ? onEnter : undefined}>Enter the room →</Button>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--qm-text-7)', marginTop: 12 }}>
              {chosen.length === 0
                ? 'Choose at least one character — the reason sits under the button, not in a tooltip.'
                : 'Disabled until at least one character is chosen and the story-time parses.'}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { NewScene });
