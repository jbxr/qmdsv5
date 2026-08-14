const { Button, Icon, StateDot, Avatar, Card, EraChip, EntityToken, Field, TextArea, Tabs, SegmentedControl, TimelineRow, BeatCard, NoteBlock, Callout, SaveStatus, PanelHeader, TopBar, StatusBar, Kbd, PromptField } = window.QuantumMateriaDesignSystem_488cde;

function Outline({ onExit }) {
  const [density, setDensity] = React.useState('Comfortable');
  const [tab, setTab] = React.useState('Details');
  const [collapsed, setCollapsed] = React.useState(false);
  const focus = density === 'Focus';
  const rails = !focus;

  return (
    <div data-qm-density={focus ? 'focus' : density.toLowerCase()} style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--qm-surface-shell)' }}>
      <TopBar tall breadcrumb="Outline"
        center={
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 34, padding: '0 14px 0 12px', borderRadius: 8, background: 'var(--qm-fill-rest)', border: '1px solid var(--qm-border-group)', fontSize: 13.5, cursor: 'pointer' }}>
            <span style={{ color: 'var(--qm-text-6)' }}>Whole chronology</span>
            <Icon name="chevronRight" size={12} color="var(--qm-text-hairline)" />
            <span style={{ color: 'var(--qm-text-row)' }}>Epigraphs</span>
            <Icon name="chevronRight" size={12} color="var(--qm-text-hairline)" />
            <span style={{ color: 'var(--qm-text-2)' }}>Sarita reads a letter…</span>
            <Kbd style={{ height: 22, minWidth: 0, fontSize: 11, boxShadow: 'none' }}>⌘K</Kbd>
          </div>
        }>
        <SaveStatus inline>Local draft</SaveStatus>
        <SegmentedControl value={density} onChange={setDensity} options={['Comfortable', 'Compact', { value: 'Focus', label: 'Focus', outline: true }]} />
        <Button variant="primary">Save</Button>
        <Button onClick={onExit}>Exit</Button>
      </TopBar>
      <StatusBar left="outline · epigraphs · depth 3" right={<>9 rows · 603 chars · <span style={{ color: 'var(--qm-gold)' }}>1 proposed</span></>} />

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {rails ? (
          <div style={{ width: 'var(--qm-rail-w-live)', flex: 'none', background: 'var(--qm-surface-panel)', borderRight: '1px solid var(--qm-border-panel)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid var(--qm-border-group)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: 'var(--qm-ls-module)', color: 'var(--qm-text-row)' }}>TIMELINE</span>
                <Button size="xxs" onClick={() => setCollapsed((c) => !c)} leadingIcon={<Icon name="unfold" size={14} />}>{collapsed ? 'Expand' : 'Collapse all'}</Button>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 12.5, color: 'var(--qm-text-6)' }}>57 canon · <span style={{ color: 'var(--qm-gold)' }}>1 proposed</span></span>
                <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 12, color: 'var(--qm-text-6)' }}>⌥⌘0</span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 7, height: 28, padding: '0 10px', borderRadius: 6, fontSize: 12.5, color: 'var(--qm-teal-text-quiet)', background: 'var(--qm-tint-teal)', border: '1px solid var(--qm-border-teal)', cursor: 'pointer' }}><StateDot state="canon" size={7} />Canon</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 7, height: 28, padding: '0 10px', borderRadius: 6, fontSize: 12.5, color: 'var(--qm-gold-text)', background: 'var(--qm-tint-gold)', border: '1px solid var(--qm-border-gold)', cursor: 'pointer' }}><StateDot state="proposed" size={7} />Proposed</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 7, height: 28, padding: '0 10px', borderRadius: 6, fontSize: 12.5, color: 'var(--qm-text-5)', border: '1px solid var(--qm-border-control-quiet)', cursor: 'pointer' }}><StateDot state="suggested" size={7} />Suggested</span>
              </div>
            </div>

            <div className="qm-scroll" style={{ flex: 1, overflowY: 'auto', padding: '4px 10px 30px' }}>
              {collapsed ? (
                <div style={{ position: 'relative', paddingLeft: 16 }}>
                  <div style={{ position: 'absolute', left: 5, top: 10, bottom: 8, width: 1, background: 'linear-gradient(180deg, rgba(241,123,84,0.45), rgba(255,255,255,0.08))' }} />
                  {window.QM_YEARS_COLLAPSED.map((y) => (
                    <div key={y.year} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 12, padding: '11px 12px', borderRadius: 7, marginBottom: 1, cursor: 'pointer', background: y.here ? 'linear-gradient(90deg, rgba(241,123,84,0.10), transparent)' : 'transparent' }}>
                      <span style={{ position: 'absolute', left: -11, width: 7, height: 7, borderRadius: '50%', background: y.here ? 'var(--qm-coral)' : 'var(--qm-text-faint)' }} />
                      <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 13, letterSpacing: 'var(--qm-ls-mono-tight)', color: y.here ? 'var(--qm-coral)' : 'var(--qm-text-4)', width: 62, flex: 'none' }}>{y.year}</span>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                        {y.dots.map((d, i) => <StateDot key={i} state={d} size={7} />)}
                      </div>
                      <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 12, color: 'var(--qm-text-6)' }}>{y.count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div style={{ position: 'relative', paddingLeft: 16 }}>
                    <div style={{ position: 'absolute', left: 5, top: 26, bottom: 4, width: 1, background: 'linear-gradient(180deg, rgba(241,123,84,0.55), rgba(255,255,255,0.08))' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '16px 0 8px' }}>
                      <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 12.5, letterSpacing: 'var(--qm-ls-year)', color: 'var(--qm-coral)' }}>YEAR −40</span>
                      <div style={{ flex: 1, height: 1, background: 'rgba(241,123,84,0.22)' }} />
                    </div>
                    <TimelineRow selected here state="proposed" who="SF" title="The student begins by describing the Artifact as a work of art" meta="depth 3" />
                  </div>
                  {window.QM_YEARS.map((y) => (
                    <div key={y.year} style={{ position: 'relative', paddingLeft: 16 }}>
                      <div style={{ position: 'absolute', left: 5, top: 26, bottom: 4, width: 1, background: 'var(--qm-border-panel)' }} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '16px 0 8px' }}>
                        <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 12.5, letterSpacing: 'var(--qm-ls-year)', color: 'var(--qm-text-4)' }}>YEAR {y.year}</span>
                        <div style={{ flex: 1, height: 1, background: 'var(--qm-border-group)' }} />
                        <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 12.5, color: 'var(--qm-text-6)', display: 'var(--qm-meta, inline)' }}>{y.count}</span>
                      </div>
                      {y.events.map((ev, i) => <TimelineRow key={i} state={ev.state} who={ev.who} title={ev.title} meta={ev.meta} />)}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        ) : null}

        <div className="qm-scroll" style={{ flex: 1, minWidth: 0, overflowY: 'auto', background: 'var(--qm-surface-canvas-glow)' }}>
          <div style={{ width: 'var(--qm-col)', maxWidth: 'calc(100% - 80px)', margin: '0 auto', padding: '44px 0 90px' }}>
            <div style={{ paddingBottom: 22, marginBottom: 26, borderBottom: '1px solid var(--qm-border-panel)' }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: 'var(--qm-ls-module)', color: 'var(--qm-text-5)', marginBottom: 12 }}>EPIGRAPHS</div>
              <div style={{ fontFamily: 'var(--qm-font-serif)', fontSize: 'var(--qm-type-context-header)', lineHeight: 'var(--qm-type-context-header-lh)', color: 'var(--qm-prose-2)' }}>Sarita Fernandes reads a letter from a prospective student</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 14, fontFamily: 'var(--qm-font-mono)', fontSize: 12.5, color: 'var(--qm-text-6)' }}>
                <span>Y35.100 → Y−40</span><span style={{ color: 'var(--qm-text-faint)' }}>·</span>
                <span>8 beats</span><span style={{ color: 'var(--qm-text-faint)' }}>·</span>
                <span style={{ color: 'var(--qm-gold)' }}>1 proposed</span>
                <span style={{ flex: 1 }} />
                <Button size="tiny">Reading mode</Button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontFamily: 'var(--qm-font-serif)', fontSize: 21, color: 'var(--qm-text-row)' }}>Epigraphs</span>
              <EraChip size="sm">Y35.100</EraChip>
            </div>

            <div style={{ marginTop: 10, paddingLeft: 22, borderLeft: '1px solid var(--qm-border-ancestry)' }}>
              <div style={{ padding: '4px 0' }}>
                <span style={{ fontFamily: 'var(--qm-font-serif)', fontSize: 20, color: 'var(--qm-text-row)' }}>
                  <EntityToken variant="inline" name="Sarita Fernandes" /> reads a letter from a prospective student
                </span>
              </div>
              <div style={{ marginTop: 8, paddingLeft: 22, borderLeft: '1px solid rgba(226,165,68,0.24)' }}>
                <BeatCard state="proposed" era="Y−40" entity="Sarita Fernandes"
                  title="The student begins by describing the Artifact as a work of art"
                  directive="without naming it yet"
                  actions={<>
                    <Button variant="canon" leadingIcon={<StateDot state="canon" size={7} />}>Make canon</Button>
                    <Button>Edit here</Button>
                    <Button variant="consult" leadingIcon={<StateDot state="suggested" size={7} />}>Consult Sarita</Button>
                  </>} />
                <NoteBlock style={{ marginBottom: 'var(--qm-beat-gap)' }}>Note — he is describing the Chrysalis.</NoteBlock>
                {window.QM_OUTLINE_ROWS.map((r, i) => (
                  <div key={i} style={{ position: 'relative', padding: '3px 0 var(--qm-beat-gap)' }}>
                    <span style={{ position: 'absolute', left: -22, top: 17, width: 14, height: 1, background: 'rgba(255,255,255,0.12)' }} />
                    <span style={{ fontFamily: 'var(--qm-font-serif)', fontSize: 'var(--qm-prose-size)', lineHeight: 1.65, color: 'var(--qm-prose-3)' }}>{r}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, fontSize: 13.5, color: 'var(--qm-text-6)', cursor: 'pointer' }}>
                  <span style={{ width: 18, height: 18, borderRadius: 5, border: '1px dashed rgba(255,255,255,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name="plus" size={13} />
                  </span>Add beat
                </div>
              </div>
            </div>
          </div>
        </div>

        {rails ? (
          <div style={{ width: 'var(--qm-insp-w)', flex: 'none', background: 'var(--qm-surface-panel)', borderLeft: '1px solid var(--qm-border-panel)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '15px 18px 0', borderBottom: '1px solid var(--qm-border-panel)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: 'var(--qm-ls-module)', color: 'var(--qm-text-row)' }}>INSPECTOR</span>
                <span style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 12, color: 'var(--qm-text-6)' }}>depth 3 · Y−40</span>
              </div>
              <Tabs tabs={['Details', 'Character', 'Consult', 'History']} value={tab} onChange={setTab} />
            </div>

            <div className="qm-scroll" style={{ flex: 1, overflowY: 'auto', padding: 18 }}>
              {tab === 'Details' ? (
                <>
                  <Callout tone="conflict" style={{ marginBottom: 20 }} action={<>Why this matters <Icon name="chevronRight" size={12} style={{ display: 'inline-block', verticalAlign: -2 }} /></>}>
                    Marked <strong style={{ fontWeight: 600, color: 'var(--qm-cinnabar-text-strong)' }}>Y−40</strong>, but the room is at <strong style={{ fontWeight: 600, color: 'var(--qm-cinnabar-text-strong)' }}>Y0</strong>.
                  </Callout>
                  <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: 'var(--qm-ls-mono)', color: 'var(--qm-text-5)', marginBottom: 12 }}>EVENT</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                    <Field label="Type" kind="mono" value="narrative_beat" />
                    <Field label="What happened" value="occurs" select />
                    <Field label="Subject" placeholder="— none —" select />
                    <Field label="Target" placeholder="— none —" select />
                  </div>
                  <TextArea
                    label="Description" kind="serif" rows={2}
                    defaultValue="The student begins by describing the Artifact as a work of art (without naming it yet)"
                    controlStyle={{ fontSize: 16, lineHeight: 1.55, color: 'var(--qm-prose-6)' }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                    <span style={{ fontSize: 13, color: 'var(--qm-text-7)' }}>Draft only until <span style={{ fontFamily: 'var(--qm-font-mono)', color: 'var(--qm-text-4)' }}>⌘S</span></span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Button size="xs">Discard</Button>
                      <Button variant="primary" size="xs">Apply</Button>
                    </div>
                  </div>
                  <div style={{ height: 1, background: 'var(--qm-border-group)', margin: '22px 0 18px' }} />
                  <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: 'var(--qm-ls-mono)', color: 'var(--qm-text-5)', marginBottom: 12 }}>ANCESTRY</div>
                  <div style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 13, lineHeight: 1.9, color: 'var(--qm-text-6)' }}>
                    <div>Epigraphs</div>
                    <div style={{ paddingLeft: 14 }}>↳ <span style={{ color: 'var(--qm-blue-text)' }}>@Sarita Fernandes</span> reads a letter…</div>
                    <div style={{ paddingLeft: 28, color: 'var(--qm-prose-6)' }}>↳ The student begins by describing…</div>
                  </div>
                </>
              ) : null}

              {tab === 'Character' ? (
                <>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 18 }}>
                    <Avatar initials="SF" size={52} />
                    <div>
                      <div style={{ fontFamily: 'var(--qm-font-serif)', fontSize: 21, color: 'var(--qm-prose-2)' }}>Sarita Fernandes</div>
                      <div style={{ fontSize: 13.5, color: 'var(--qm-text-6)', marginTop: 3 }}>Instructor · present at Y0 · 41 appearances</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--qm-text-3)', marginBottom: 18 }}>Reads the letter aloud in the epigraph frame. Her account of the Artifact predates the public record by four decades, which is why this beat carries a time conflict.</div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: 'var(--qm-ls-mono)', color: 'var(--qm-text-5)', marginBottom: 10 }}>DOSSIER</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {['Where she is at Y−40', 'Relationships', 'Every beat she touches'].map((r) => (
                      <div key={r} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 13px', borderRadius: 7, background: 'rgba(255,255,255,0.035)', fontSize: 14, color: 'var(--qm-text-emph)', cursor: 'pointer' }}>
                        {r}<Icon name="chevronRight" size={12} color="var(--qm-text-6)" />
                      </div>
                    ))}
                  </div>
                </>
              ) : null}

              {tab === 'Consult' ? (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '10px 12px', borderRadius: 7, background: 'rgba(162,146,242,0.10)', border: '1px solid rgba(162,146,242,0.26)', fontSize: 13, color: 'var(--qm-violet-text)', marginBottom: 16 }}>
                    <StateDot state="suggested" size={7} />Private · answers as of Y0 · never touches canon
                  </div>
                  <div style={{ alignSelf: 'flex-end', maxWidth: '88%', padding: '12px 14px', borderRadius: 'var(--qm-bubble-you)', background: 'var(--qm-fill-hover)', fontSize: 14.5, lineHeight: 1.6, color: 'var(--qm-text-2)', marginBottom: 12 }}>Given only what you know now — is this what you would do?</div>
                  <div style={{ maxWidth: '92%', padding: '14px 16px', borderRadius: 'var(--qm-bubble-them)', background: 'rgba(162,146,242,0.10)', border: '1px solid rgba(162,146,242,0.22)', fontFamily: 'var(--qm-font-serif)', fontSize: 16, lineHeight: 1.65, color: 'var(--qm-violet-prose)' }}>I would not name it. Naming it would make the letter a report, and I am reading it as a confession.</div>
                  <div style={{ flex: 1 }} />
                  <PromptField audience="character" placeholder="Ask Sarita…" style={{ marginTop: 18, height: 44 }} />
                </div>
              ) : null}

              {tab === 'History' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {window.QM_HISTORY.map((h, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 6px', borderBottom: '1px solid var(--qm-border-list)' }}>
                      <StateDot state={h.state} size={8} style={{ marginTop: 6 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, color: 'var(--qm-text-3)', lineHeight: 1.5 }}>{h.what}</div>
                        <div style={{ fontFamily: 'var(--qm-font-mono)', fontSize: 12, color: 'var(--qm-text-7)', marginTop: 4 }}>{h.when}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

Object.assign(window, { Outline });
