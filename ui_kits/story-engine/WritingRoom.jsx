const { Button, Icon, StateDot, Avatar, Card, EraChip, RouteChip, EntityToken, TopBar, EmptyState, SaveStatus } = window.QuantumMateriaDesignSystem_488cde;

function WritingRoom({ onOpenScene, onNewScene, onNewOutline, onCompose, onOpenOutline }) {
  const [resume, earlier] = [window.QM_SCENES[0], window.QM_SCENES.slice(1)];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--qm-surface-shell)' }}>
      <TopBar breadcrumb={false}>
        <SaveStatus inline state="saved">Room live</SaveStatus>
        <span style={{ width: 30, height: 30, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, border: '1px solid var(--qm-border-control)', cursor: 'pointer' }}>
          <Icon name="sliders" size={15} color="var(--qm-text-4)" />
        </span>
      </TopBar>

      <div className="qm-scroll" style={{ flex: 1, overflowY: 'auto', background: 'var(--qm-surface-app-glow)' }}>
        <div style={{ width: 1080, maxWidth: 'calc(100% - 80px)', margin: '0 auto', padding: '52px 0 70px' }}>
          <div style={{ marginBottom: 34 }}>
            <div style={{ fontFamily: 'var(--qm-font-serif)', fontSize: 'var(--qm-type-room-title)', lineHeight: 'var(--qm-type-room-title-lh)', color: 'var(--qm-prose-1)' }}>The writing room</div>
            <div style={{ fontSize: 15.5, color: 'var(--qm-text-5)', marginTop: 10 }}>Four scenes, two of them unfinished. Pick up where the room left off.</div>
          </div>

          <Card surface="selected" rail="parchment" padding="26px 28px" style={{ marginBottom: 30 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 28 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 11.5, letterSpacing: 'var(--qm-ls-module)', color: 'var(--qm-text-4)', marginBottom: 12 }}>CONTINUE · 6 HOURS AGO</div>
                <div style={{ fontFamily: 'var(--qm-font-serif)', fontSize: 'var(--qm-type-scene-title)', lineHeight: 'var(--qm-type-scene-title-lh)', color: 'var(--qm-prose-1)' }}>{resume.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14 }}>
                  <EraChip>{resume.when}</EraChip>
                  <span style={{ display: 'flex' }}>
                    <Avatar initials="VN" />
                    <Avatar initials="CB" style={{ marginLeft: -7 }} />
                  </span>
                  <span style={{ fontSize: 14, color: 'var(--qm-text-5)' }}>{resume.cast}</span>
                </div>
                <div style={{ fontFamily: 'var(--qm-font-serif)', fontSize: 16.5, lineHeight: 1.6, color: 'var(--qm-text-4)', marginTop: 16, maxWidth: 560 }}>{resume.excerpt}</div>
              </div>
              <div style={{ width: 300, flex: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Button variant="primary" size="lg" fullWidth onClick={onOpenScene}
                  leadingIcon={<Icon name="play" size={11} />} style={{ justifyContent: 'flex-start' }} hint={resume.words + ' words'}>Resume the prose</Button>
                <Button variant="quiet" size="lg" fullWidth onClick={onNewOutline}
                  leadingIcon={<Icon name="list" size={15} />} style={{ justifyContent: 'flex-start' }} hint="nothing yet">Start an outline</Button>
                <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
                  <Button size="tiny" fullWidth leadingIcon={<Icon name="pencil" size={13} />}>Rename</Button>
                  <Button size="tiny" fullWidth leadingIcon={<Icon name="x" size={13} />}>Delete</Button>
                </div>
              </div>
            </div>
          </Card>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 38 }}>
            {[
              { icon: 'plus', title: 'New scene', body: 'A live room: cast, story-time, and the Director running turns beside your prose.', go: onNewScene, tone: 'var(--qm-gold)' },
              { icon: 'list', title: 'New outline', body: 'Beats first. Rows, story-time markers and proposed events — no room required.', go: onNewOutline, tone: 'var(--qm-gold)' },
              { icon: 'grip', title: 'Compose from candidates', body: 'Read a generated set side by side and take the best beat from each column.', go: onCompose, tone: 'var(--qm-violet)' }
            ].map((c) => (
              <Card key={c.title} hoverable padding="18px 20px" onClick={c.go}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <Icon name={c.icon} size={15} color={c.tone} />
                  <span style={{ fontSize: 15, color: 'var(--qm-prose-2)' }}>{c.title}</span>
                </div>
                <div style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--qm-text-6)' }}>{c.body}</div>
              </Card>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: 'var(--qm-ls-module)', color: 'var(--qm-text-5)' }}>EARLIER SCENES</span>
            <span style={{ fontSize: 13.5, color: 'var(--qm-text-6)' }}>3 scenes</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {earlier.map((s) => (
              <Card key={s.id} hoverable padding="18px 20px" onClick={() => onOpenOutline(s)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontFamily: 'var(--qm-font-serif)', fontSize: 20, color: 'var(--qm-prose-2)' }}>{s.title}</span>
                  <EraChip kind={s.era} size="sm">{s.when}</EraChip>
                  <span style={{ fontSize: 13.5, color: 'var(--qm-text-5)' }}>{s.cast}</span>
                  <span style={{ flex: 1 }} />
                  <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 12.5, color: 'var(--qm-text-6)' }}>{s.opened}</span>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                  <RouteChip state={s.proseState} icon={<Icon name="play" size={11} />}>{s.prose}</RouteChip>
                  <RouteChip state={s.outlineState} icon={<Icon name="list" size={15} />}>{s.outline}</RouteChip>
                </div>
              </Card>
            ))}
          </div>

          <EmptyState kind="unknown" icon={<Icon name="help" size={14} />} style={{ marginTop: 18 }}>
            <span style={{ color: 'var(--qm-text-emph)' }}>Unknown is not empty.</span> When a scene’s drafts can’t be read — storage blocked, private mode — the chip shows the bare surface name and still opens it. It never claims the scene holds nothing.
          </EmptyState>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { WritingRoom });
