const { Button, Icon, StateDot, Avatar, EraChip, EntityToken, BeatSpine, PromptField, PanelHeader, NoteBlock, VersionStrip, AnnotationMark, SaveStatus, Kbd, TopBar, EmptyState } = window.QuantumMateriaDesignSystem_488cde;

/** Placeholder for author-supplied imagery — QM ships no illustration set. */
function Slot({ label, height, radius = 9 }) {
  return (
    <div style={{
      height, borderRadius: radius, background: 'var(--qm-fill-inset)',
      border: '1px dashed var(--qm-border-dashed)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', gap: 8,
      fontSize: 12.5, color: 'var(--qm-text-8)'
    }}>
      <Icon name="image" size={14} />{label}
    </div>
  );
}

/**
 * Every collapse, dismiss and reveal in this room is a control, so each one is
 * a real `<button>` — reachable by Tab, activated by Enter and Space for free.
 * It carries QM's ring the way `Button` does, and nothing else: the styling
 * stays at the call site, where the surface it sits on decides it.
 */
function Pressable({ label, onClick, style, children, ...rest }) {
  const [ring, setRing] = React.useState(false);
  return (
    <button
      type="button" aria-label={label} onClick={onClick} {...rest}
      onFocus={(e) => { if (e.target.matches(':focus-visible')) setRing(true); }}
      onKeyDown={(e) => { if (e.target.matches(':focus-visible')) setRing(true); }}
      onBlur={() => setRing(false)}
      style={{
        margin: 0, padding: 0, font: 'inherit', color: 'inherit',
        background: 'transparent', border: 'none', cursor: 'pointer',
        ...style,
        ...(ring ? {
          boxShadow: 'var(--qm-focus-ring)',
          outline: 'var(--qm-focus-outline,2px solid transparent)',
          outlineOffset: 'var(--qm-focus-outline-offset,1px)'
        } : null)
      }}
    >{children}</button>
  );
}

function SceneRoom({ onExit }) {
  const [focus, setFocus] = React.useState(false);
  const [stage, setStage] = React.useState(true);
  const [chat, setChat] = React.useState(true);
  const [bar, setBar] = React.useState(true);
  const [reply, setReply] = React.useState(true);
  const [ask, setAsk] = React.useState('why not say his name');

  const stageOpen = stage && !focus, chatOpen = chat && !focus, barOpen = bar && !focus;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--qm-surface-shell)' }}>
      <TopBar brand={false}
        leading={<>
          <SaveStatus inline state="saved">Live</SaveStatus>
          <EraChip size="sm">Y−6 D1</EraChip>
        </>}
        center={<span style={{ fontFamily: 'var(--qm-font-serif)', fontSize: 17, color: 'var(--qm-prose-3)' }}>Savior Reveal</span>}>
        <Button size="xs" onClick={() => setFocus((v) => !v)} leadingIcon={<Icon name="maximize" size={14} />} hint="⌘\">{focus ? 'Leave focus' : 'Focus'}</Button>
        <Button variant="primary" size="xs">Save to QM</Button>
        <Button size="xs" onClick={onExit}>Exit</Button>
      </TopBar>

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* ---------------- stage rail ---------------- */}
        {stageOpen ? (
          <div style={{ width: 320, flex: 'none', display: 'flex', flexDirection: 'column', background: 'var(--qm-surface-panel)', borderRight: '1px solid var(--qm-border-panel)' }}>
            <PanelHeader label="STAGE">
              <Pressable label="Collapse the stage rail" onClick={() => setStage(false)} style={{ width: 28, height: 28, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: '1px solid var(--qm-border-control)' }}>
                <Icon name="chevronLeft" size={15} color="var(--qm-text-4)" />
              </Pressable>
            </PanelHeader>
            <div className="qm-scroll" style={{ flex: 1, overflowY: 'auto' }}>
              <div style={{ borderBottom: '1px solid var(--qm-border-group)' }}>
                <div style={{ padding: 14, paddingBottom: 0 }}><Slot label="Drop the location" height={130} /></div>
                <div style={{ padding: '11px 14px 13px' }}>
                  <div style={{ fontFamily: 'var(--qm-font-serif)', fontSize: 17, color: 'var(--qm-prose-2)' }}>Luna Station</div>
                  <div style={{ fontSize: 12.5, color: 'var(--qm-text-4)', marginTop: 3 }}>Dome and tunnel · pressurised</div>
                </div>
              </div>

              <div style={{ padding: 14, borderBottom: '1px solid var(--qm-border-group)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: 'var(--qm-ls-mono)', color: 'var(--qm-text-5)' }}>PRESENT</span>
                  <span style={{ fontSize: 12.5, color: 'var(--qm-text-6)' }}>2 of 18</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 88, height: 88, flex: 'none' }}><Slot label="vera" height={88} /></div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <span style={{ fontSize: 14.5, color: 'var(--qm-text-2)' }}>vera</span>
                          <StateDot state="suggested" size={7} pulse />
                        </div>
                        <div style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--qm-text-6)', marginTop: 4 }}>Ensign — shuttle pilot</div>
                        {reply ? (
                          <div style={{ fontSize: 12.5, color: 'var(--qm-text-7)', marginTop: 6 }}>answers as of Y−6 D1</div>
                        ) : (
                          <Pressable label="Show vera's reply" onClick={() => setReply(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 7, padding: '3px 8px', borderRadius: 5, fontSize: 12.5, color: 'var(--qm-violet-text)', background: 'var(--qm-tint-violet)', border: '1px solid var(--qm-border-violet)' }}>
                            <StateDot state="suggested" size={6} />1 reply
                          </Pressable>
                        )}
                      </div>
                    </div>
                    <PromptField audience="character" value={ask} caret style={{ marginTop: 10, height: 34 }} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 88, height: 88, flex: 'none' }}><Slot label="cade" height={88} /></div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14.5, color: 'var(--qm-text-2)' }}>cade-briggs</div>
                        <div style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--qm-text-6)', marginTop: 4 }}>Lt. — security rotation</div>
                        <div style={{ fontSize: 12.5, color: 'var(--qm-text-7)', marginTop: 6 }}>answers as of Y−6 D1</div>
                      </div>
                    </div>
                    <PromptField placeholder="ask cade-briggs…" style={{ marginTop: 10, height: 34 }} />
                  </div>
                </div>
                <div style={{ fontSize: 12.5, lineHeight: 1.6, color: 'var(--qm-text-7)', marginTop: 12 }}>Each field talks only to that character, privately. Their answer pops over the page — accept it as a turn, or keep it as a note.</div>
              </div>

              <div style={{ padding: 14 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: 'var(--qm-ls-mono)', color: 'var(--qm-text-5)' }}>OUTLINE</span>
                  <span style={{ fontSize: 12.5, color: 'var(--qm-text-6)' }}>3 of 7 written</span>
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--qm-text-7)', marginBottom: 12 }}>Savior Reveal · linked</div>
                <BeatSpine beats={window.QM_STAGE_BEATS} onSelect={() => {}} />
                <div style={{ fontSize: 12.5, lineHeight: 1.6, color: 'var(--qm-text-7)', marginTop: 12 }}>Filled dot means the prose has reached that beat. Click one to jump the draft to it.</div>
              </div>
            </div>
          </div>
        ) : !focus ? (
          <div style={{ width: 56, flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '12px 0', background: 'var(--qm-surface-panel)', borderRight: '1px solid var(--qm-border-panel)' }}>
            <Pressable label="Open the stage rail" onClick={() => setStage(true)} style={{ width: 32, height: 32, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, border: '1px solid var(--qm-border-control)' }}>
              <Icon name="chevronRight" size={12} color="var(--qm-text-4)" />
            </Pressable>
            <Avatar initials="VN" size={30} />
            <Avatar initials="CB" size={30} />
            <span style={{ width: 34, height: 34, borderRadius: 7, background: 'var(--qm-fill-chip)', border: '1px solid var(--qm-border-control-quiet)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--qm-font-mono)', fontSize: 12, color: 'var(--qm-text-6)' }}>3/7</span>
          </div>
        ) : null}

        {/* ---------------- prose ---------------- */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', background: 'var(--qm-surface-canvas-glow)', position: 'relative' }}>
          {reply && stageOpen ? (
            <div style={{ position: 'absolute', left: 14, top: 300, width: 424, zIndex: 4 }}>
              <span style={{ position: 'absolute', left: -6, top: 22, width: 11, height: 11, background: 'var(--qm-consult-surface)', borderLeft: '1px solid var(--qm-border-violet)', borderBottom: '1px solid var(--qm-border-violet)', transform: 'rotate(45deg)' }} />
              <div style={{ borderRadius: 11, background: 'var(--qm-consult-surface)', border: '1px solid var(--qm-border-violet)', boxShadow: 'var(--qm-shadow-reply)', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '10px 14px', borderBottom: '1px solid rgba(162,146,242,0.18)' }}>
                  <StateDot state="suggested" size={6} />
                  <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 11, letterSpacing: 'var(--qm-ls-mono)', color: 'var(--qm-violet-text)' }}>VERA · PRIVATE</span>
                  <span style={{ flex: 1 }} />
                  <Pressable label="Dismiss vera's reply" onClick={() => setReply(false)} style={{ width: 24, height: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
                    <Icon name="x" size={13} color="var(--qm-text-6)" />
                  </Pressable>
                </div>
                <div style={{ padding: '14px 16px', fontFamily: 'var(--qm-font-serif)', fontSize: 16, lineHeight: 1.7, color: 'var(--qm-violet-prose)' }}>Not in a breach corridor. And not in front of him — he is still deciding whether I am a person.</div>
                <div style={{ padding: '11px 14px', borderTop: '1px solid rgba(162,146,242,0.16)', background: 'rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Button variant="sceneGhost" size="xs" leadingIcon={<StateDot state="scene" size={6} />}>Play as her turn →</Button>
                  <Button variant="consult" size="xs">Keep as a note</Button>
                  <span style={{ flex: 1 }} />
                  <span style={{ fontSize: 12.5, color: 'var(--qm-text-7)' }}>only you saw this</span>
                </div>
              </div>
            </div>
          ) : null}

          {!focus ? (
            <VersionStrip
              versions={[{ label: 'this draft', score: 'lint 7·5', current: true }, { label: 'rev 3', score: '6·5' }, { label: 'rev 2', score: '6·4' }, { label: 'candidate B', origin: 'generated', score: '7·4' }]}
              note="one axis · compare any two in Compose" />
          ) : null}

          <div className="qm-scroll" style={{ flex: 1, overflowY: 'auto' }}>
            <div style={{
              width: focus ? 760 : 720, maxWidth: 'calc(100% - 96px)', margin: '0 auto',
              padding: focus ? '96px 0 80px' : '44px 0 40px',
              fontFamily: 'var(--qm-font-serif)', fontSize: focus ? 20 : 19, lineHeight: focus ? 1.9 : 1.85, color: 'var(--qm-prose-3)'
            }}>
              {focus ? window.QM_PROSE.map((p, i) => <p key={i} style={{ margin: '0 0 30px' }}>{p}</p>) : (
                <>
                  <div style={{ position: 'relative', paddingLeft: 26, marginBottom: 24 }}>
                    <StateDot state="canon" size={8} style={{ position: 'absolute', left: 0, top: 13 }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 6, fontFamily: 'var(--qm-font-sans)' }}>
                      <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 11.5, color: 'var(--qm-text-7)' }}>beat 3 · written</span>
                      <AnnotationMark style={{ fontSize: 11.5 }}>lint 7·5</AnnotationMark>
                      <AnnotationMark style={{ fontSize: 11.5 }}>fn 0.9</AnnotationMark>
                    </div>
                    <p style={{ margin: 0 }}>{window.QM_PROSE[0]}</p>
                  </div>

                  <div style={{ position: 'relative', paddingLeft: 26, marginBottom: 24 }}>
                    <StateDot state="canon" size={8} style={{ position: 'absolute', left: 0, top: 13 }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 6, fontFamily: 'var(--qm-font-sans)' }}>
                      <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 11.5, color: 'var(--qm-text-7)' }}>beat 4 · written</span>
                      <AnnotationMark tone="advisory" glyph={<StateDot state="proposed" size={6} />} style={{ fontSize: 11.5 }}>tell warning</AnnotationMark>
                      <span style={{ fontSize: 12.5, color: 'var(--qm-text-7)', fontFamily: 'var(--qm-font-sans)', cursor: 'pointer' }}>“more like a question” states the feeling</span>
                    </div>
                    <p style={{ margin: 0 }}>{window.QM_PROSE[1]}</p>
                    <p style={{ margin: 0 }}>{window.QM_PROSE[2]}</p>
                  </div>

                  <div style={{ position: 'relative', paddingLeft: 26, marginBottom: 24 }}>
                    <StateDot state="here" size={8} style={{ position: 'absolute', left: 0, top: 13 }} />
                    <span style={{ position: 'absolute', left: -10, top: 6, bottom: 6, width: 3, borderRadius: 2, background: 'var(--qm-coral)', boxShadow: 'var(--qm-glow-here)' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 6, fontFamily: 'var(--qm-font-sans)' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--qm-font-mono)', fontSize: 11.5, letterSpacing: 'var(--qm-ls-mono-tight)', color: 'var(--qm-coral-text)', background: 'var(--qm-tint-coral-strong)', borderRadius: 4, padding: '2px 7px' }}>
                        <StateDot state="here" size={6} />HERE
                      </span>
                      <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 11.5, color: 'var(--qm-text-7)' }}>beat 5 · last turn</span>
                      <AnnotationMark style={{ fontSize: 11.5 }}>fn 0.8</AnnotationMark>
                    </div>
                    <p style={{ margin: 0, padding: '10px 18px', borderRadius: 8, background: 'var(--qm-tint-parchment)', boxShadow: 'var(--qm-inset-quote)' }}>{window.QM_PROSE[3]}</p>
                    <p style={{ margin: '18px 0 0' }}>
                      <EntityToken variant="inline" name="Nakamura" />. Ensign V. <EntityToken variant="inline" name="Nakamura" />. The shuttle pilot.
                    </p>
                  </div>

                  <div style={{ position: 'relative', paddingLeft: 26 }}>
                    <StateDot state="unwritten" size={8} style={{ position: 'absolute', left: 0, top: 13 }} />
                    <div style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 11.5, color: 'var(--qm-text-7)', marginBottom: 6 }}>beat 6 · not written</div>
                    <p style={{ margin: 0, fontSize: 17, color: 'var(--qm-text-7)' }}>He reads the nameplate and says her name aloud.</p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 30, paddingLeft: 26, fontFamily: 'var(--qm-font-sans)' }}>
                    <SaveStatus inline>Local draft · 377 words · 4 of 7 beats written</SaveStatus>
                  </div>
                </>
              )}
            </div>
          </div>

          {focus ? (
            <div style={{ flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 12, fontSize: 13, color: 'var(--qm-text-hairline)' }}>
              <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 12, color: 'var(--qm-text-8)' }}>⌘\</span> to bring everything back
            </div>
          ) : barOpen ? (
            <div style={{ flex: 'none', background: 'var(--qm-scene-surface)', borderTop: '1px solid var(--qm-scene-border)' }}>
              <PanelHeader audience="scene" label="IN SCENE" note="everyone in the room hears this" style={{ padding: '11px 22px' }}>
                <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 12, color: 'var(--qm-scene-meta)' }}>turn 4 · vera to act</span>
                <Pressable label="Hide the in-scene controls" onClick={() => setBar(false)} style={{ width: 26, height: 26, marginLeft: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: '1px solid rgba(232,220,192,0.24)' }}>
                  <Icon name="chevronDown" size={14} color="var(--qm-parchment-text)" />
                </Pressable>
              </PanelHeader>
              <div style={{ padding: '14px 22px 16px' }}>
                <NoteBlock tone="scene" style={{ background: 'transparent', padding: 0, marginBottom: 14 }}>
                  <span style={{ fontStyle: 'normal', color: 'var(--qm-scene-text)' }}><b style={{ color: 'var(--qm-scene-text-strong)' }}>Cade</b> I am capable of movement. Stand back.</span>
                </NoteBlock>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontFamily: 'var(--qm-font-sans)' }}>
                  <Button variant="scene" size="md">Advance the scene</Button>
                  <Button variant="sceneGhost" size="md">Redo last turn</Button>
                  <Button variant="sceneGhost" size="md">Write the turn myself</Button>
                  <span style={{ flex: 1 }} />
                  <span style={{ fontSize: 13, color: 'var(--qm-scene-meta)' }}>Director proposes <span style={{ color: 'var(--qm-scene-text)' }}>vera</span> · tension <span style={{ color: 'var(--qm-scene-text)' }}>high</span></span>
                </div>
              </div>
            </div>
          ) : (
            <Pressable label="Show the in-scene controls" onClick={() => setBar(true)} style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 22px', textAlign: 'left', background: 'var(--qm-scene-surface)', border: 'none', borderTop: '1px solid var(--qm-scene-border)' }}>
              <StateDot state="scene" size={8} glow />
              <span style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: 'var(--qm-ls-module)', color: 'var(--qm-scene-label)' }}>IN SCENE</span>
              <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 12, color: 'var(--qm-scene-meta)' }}>turn 4 · vera to act</span>
              <span style={{ flex: 1 }} />
              <span style={{ fontSize: 13, color: 'var(--qm-scene-text-dim)' }}>show the controls</span>
              <Icon name="chevronUp" size={14} color="var(--qm-parchment-text)" />
            </Pressable>
          )}
        </div>

        {/* ---------------- assistant rail ---------------- */}
        {chatOpen ? (
          <div style={{ width: 468, flex: 'none', display: 'flex', flexDirection: 'column', borderLeft: '1px solid var(--qm-border-panel)', background: 'var(--qm-surface-rail)' }}>
            <PanelHeader audience="private" label="PRIVATE" note="nothing here is witnessed until you send it">
              <Pressable label="Collapse the assistant rail" onClick={() => setChat(false)} style={{ width: 28, height: 28, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, border: '1px solid var(--qm-border-control-quiet)' }}>
                <Icon name="chevronRight" size={15} color="var(--qm-text-4)" />
              </Pressable>
            </PanelHeader>
            <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderBottom: '1px solid var(--qm-border-group)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, height: 26, padding: '0 9px', borderRadius: 5, fontSize: 12.5, color: 'var(--qm-text-3)', background: 'var(--qm-fill-chip)', border: '1px solid var(--qm-border-control)' }}>
                <StateDot state="neutral" size={6} />Assistant
              </span>
              <AnnotationMark>qm-api · 6 tools</AnnotationMark>
              <AnnotationMark>3 skills</AnnotationMark>
            </div>
            <div className="qm-scroll" style={{ flex: 1, overflowY: 'auto', padding: '16px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
                <div style={{ maxWidth: '86%', padding: '11px 14px', borderRadius: 'var(--qm-bubble-you)', background: 'var(--qm-fill-hover)', fontSize: 14.5, lineHeight: 1.6, color: 'var(--qm-text-2)' }}>Who else was on Luna Station that shift?</div>
              </div>
              <div style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <StateDot state="neutral" size={6} /><span style={{ fontSize: 12.5, color: 'var(--qm-text-6)' }}>Claude</span>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 11px', borderRadius: 6, background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.09)', marginBottom: 10 }}>
                  <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 11.5, color: 'var(--qm-text-6)' }}>qm.events.query</span>
                  <span style={{ fontSize: 12.5, color: 'var(--qm-text-7)' }}>Y−6 · Luna Station</span>
                  <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 11.5, color: 'var(--qm-teal-text)' }}>8 rows</span>
                </div>
                <div style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--qm-text-3)' }}>
                  Three on shift: <EntityToken variant="inline" name="Vera Nakamura" />, <EntityToken variant="inline" name="Cade Briggs" />, and the civilian team under <EntityToken variant="inline" name="Boone Clay" />. The fragment is logged inert until 1009.
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <Button size="xxs">Add Boone to cast</Button>
                  <Button size="xxs">Open the chronology</Button>
                </div>
              </div>
              <NoteBlock size="sm" style={{ fontStyle: 'normal' }}>
                <span style={{ fontStyle: 'normal', fontFamily: 'var(--qm-font-sans)', fontSize: 13.5, color: 'var(--qm-text-6)' }}>
                  The assistant reads and writes QM through its tools. It never speaks as a character, and never takes a turn — <span style={{ color: 'var(--qm-text-emph)' }}>to ask a character, use the field under their portrait.</span>
                </span>
              </NoteBlock>
            </div>
            <div style={{ flex: 'none', borderTop: '1px solid var(--qm-border-panel)', padding: '12px 18px 14px' }}>
              <div style={{ borderRadius: 9, background: 'var(--qm-fill-inset)', border: '1px solid var(--qm-border-control)', padding: '11px 13px' }}>
                <div style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--qm-text-7)' }}>Ask about the world, or make a change in QM…</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 11 }}>
                  <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 11.5, color: 'var(--qm-text-6)' }}>/ skill · # event</span>
                  <span style={{ flex: 1 }} />
                  <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 11.5, color: 'var(--qm-text-6)' }}>⇧⏎ newline</span>
                  <Button variant="primary" size="xxs">Send ⏎</Button>
                </div>
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--qm-text-7)', marginTop: 10 }}>Nothing sent from here is in scene.</div>
            </div>
          </div>
        ) : !focus ? (
          <div style={{ width: 56, flex: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '12px 0', background: 'var(--qm-surface-rail)', borderLeft: '1px solid var(--qm-border-panel)' }}>
            <Pressable label="Open the assistant rail" onClick={() => setChat(true)} style={{ width: 32, height: 32, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 7, border: '1px solid var(--qm-border-control)' }}>
              <Icon name="chevronLeft" size={15} color="var(--qm-text-4)" />
            </Pressable>
            <Icon name="message" size={15} color="var(--qm-text-6)" />
            <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 11, color: 'var(--qm-text-8)', writingMode: 'vertical-rl' }}>assistant</span>
          </div>
        ) : null}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 18px', borderTop: '1px solid var(--qm-border-panel)', background: 'var(--qm-surface-status)', fontSize: 13.5, color: 'var(--qm-text-6)' }}>
        <span style={{ color: 'var(--qm-text-emph)' }}>Who you are talking to is where you are typing.</span>
        <span>A character’s field sits under their face; the assistant has its own rail; only the warm bar under the prose reaches the room.</span>
        <span style={{ flex: 1 }} />
        <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 12.5 }}>private by default · the scene is a deliberate act</span>
      </div>
    </div>
  );
}

Object.assign(window, { SceneRoom });
