/**
 * Type tests for the shipped hand-written `.d.ts` files.
 *
 * Nothing here runs. `npm run typecheck` compiles it with `--noEmit` against a
 * strict tsconfig, so a prop that shadows a DOM attribute — the class of bug in
 * issue #1 — fails the build instead of reaching a consumer.
 */
import * as React from 'react';

import { Avatar } from '../components/core/Avatar';
import { Button } from '../components/core/Button';
import { Card } from '../components/core/Card';
import { Icon, QM_ICONS } from '../components/core/Icon';
import type { QMIconName } from '../components/core/Icon';
import { Kbd } from '../components/core/Kbd';
import { StateDot } from '../components/core/StateDot';
import type { StateDotProps } from '../components/core/StateDot';

import { Callout } from '../components/feedback/Callout';
import { EmptyState } from '../components/feedback/EmptyState';
import { ModeBar } from '../components/feedback/ModeBar';
import { Overlay } from '../components/feedback/Overlay';
import { Refusal } from '../components/feedback/Refusal';
import { SaveStatus } from '../components/feedback/SaveStatus';

import { Field } from '../components/forms/Field';
import { Picker } from '../components/forms/Picker';
import { TextArea } from '../components/forms/TextArea';
import { TextField } from '../components/forms/TextField';
import type { PickerItem } from '../components/forms/Picker';
import { PromptField } from '../components/forms/PromptField';
import type { PromptAudience } from '../components/forms/PromptField';
import { PromptTextField } from '../components/forms/PromptTextField';
import { SegmentedControl } from '../components/forms/SegmentedControl';
import type { SegmentedOption } from '../components/forms/SegmentedControl';
import { Tabs } from '../components/forms/Tabs';

import { AnnotationMark } from '../components/narrative/AnnotationMark';
import { BeatCard } from '../components/narrative/BeatCard';
import { BeatSpine } from '../components/narrative/BeatSpine';
import type { BeatSpineItem } from '../components/narrative/BeatSpine';
import { EntityToken } from '../components/narrative/EntityToken';
import { EraChip } from '../components/narrative/EraChip';
import { NoteBlock } from '../components/narrative/NoteBlock';
import { RouteChip } from '../components/narrative/RouteChip';
import { TimelineRow } from '../components/narrative/TimelineRow';
import type { TimelineRowProps } from '../components/narrative/TimelineRow';
import { VersionStrip } from '../components/narrative/VersionStrip';
import type { VersionEntry } from '../components/narrative/VersionStrip';

import { PanelHeader } from '../components/navigation/PanelHeader';
import { StatusBar } from '../components/navigation/StatusBar';
import { TopBar } from '../components/navigation/TopBar';

/* ------------------------------------------------------------------ *
 * Prop unions documented in the cards must actually exist.
 * ------------------------------------------------------------------ */

const stateDotStates: ReadonlyArray<NonNullable<StateDotProps['state']>> = [
  'canon', 'written', 'proposed', 'suggested', 'here', 'conflict',
  'unwritten', 'unlinked', 'entity', 'neutral', 'private', 'scene',
];

/** The chronology rail's own state union — narrower than StateDot's. */
type TimelineRowState = NonNullable<TimelineRowProps['state']>;
const timelineRowStates: ReadonlyArray<TimelineRowState> = [
  'canon', 'proposed', 'suggested', 'here', 'conflict', 'unlinked',
];

/** Exported so a consumer names the vocabulary; a widened audience lands here. */
const audiences: ReadonlyArray<PromptAudience> = ['private', 'character', 'direction', 'scene'];

const iconNames: ReadonlyArray<QMIconName> = [
  'play', 'grip', 'more', 'list', 'sliders', 'pencil', 'x', 'plus', 'check',
  'chevronRight', 'chevronLeft', 'chevronDown', 'chevronUp', 'chevronsUpDown',
  'unfold', 'arrowLeft', 'image', 'lock', 'message', 'maximize', 'highlighter', 'help',
];

const iconTable: Record<QMIconName, { fill: boolean; d: string }> = QM_ICONS;

/* ------------------------------------------------------------------ *
 * core
 * ------------------------------------------------------------------ */

export function CoreKit(): React.JSX.Element {
  return (
    <Card surface="beat" rail="gold" radius="card" padding="20px 24px 18px" hoverable className="qm-kit" id="core-kit">
      <Avatar initials="VN" kind="character" size={22} style={{ opacity: 0.9 }} />
      <Avatar initials="LS" kind="location" size={26} />
      <Button
        variant="primary"
        size="md"
        hint="H"
        leadingIcon={<Icon name="check" size={16} strokeWidth={2} />}
        trailingIcon={<Icon name="chevronRight" size={13} color="var(--qm-text-6)" />}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => void e}
        disabled={false}
        fullWidth
        style={{ marginTop: 8 }}
      >
        Make canon
      </Button>
      <Button variant="sceneGhost" size="tiny">Consult</Button>
      <Button variant="destructive" size="tiny" leadingIcon={<Icon name="x" size={13} />}>Delete</Button>
      <Kbd variant="key">⏎</Kbd>
      <Kbd variant="local">local</Kbd>
      <StateDot state="here" size={9} glow pulse style={{ marginLeft: 6 }} />
      <StateDot state={stateDotStates[0]} />
      <span>{iconNames.length + Object.keys(iconTable).length}</span>
    </Card>
  );
}

/* ------------------------------------------------------------------ *
 * feedback
 * ------------------------------------------------------------------ */

export function FeedbackKit(): React.JSX.Element {
  return (
    <>
      <Callout tone="conflict" glyph={null} action={<Button variant="quiet" size="xs">Why this matters</Button>}>
        Two beats claim the same story-time.
      </Callout>
      <Callout tone="canon">Locked as canon.</Callout>
      <EmptyState kind="unknown" icon={<Icon name="help" size={16} />}>
        Drafts are unreadable from here.
      </EmptyState>
      <ModeBar mode="linking" exitKey={<Kbd>Esc</Kbd>}>Pick the beat this line belongs to</ModeBar>
      {/*
        Overlay.title is the panel heading (ReactNode), not the DOM tooltip.
        Not in issue #1's inventory — found only by this typecheck.
      */}
      <Overlay
        title={<em>Story-time</em>}
        onClose={() => undefined}
        footer={<Kbd variant="local">local</Kbd>}
        width={420}
        scrim
        className="qm-overlay"
        aria-label="Story-time"
      >
        <Field label="Anchor" value="Y−40" kind="mono" />
      </Overlay>
      <Refusal pressed={<Kbd>⌘S</Kbd>}>Saving is automatic — press ⏎ to commit the beat.</Refusal>
      <SaveStatus state="saved" tag="locked" inline>Saved</SaveStatus>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * forms
 * ------------------------------------------------------------------ */

const pickerItems: PickerItem[] = [
  {
    id: 'vera',
    label: 'Vera Nakamura',
    meta: 'character',
    leading: <Avatar initials="VN" kind="character" size={22} />,
    active: true,
    onSelect: () => undefined,
  },
  { id: 2, label: 'Y−6 D1', meta: 'already used · 8×', mono: true, color: 'var(--qm-coral-text)', trailingRight: true, separated: true },
];

const segmentedOptions: Array<string | SegmentedOption> = [
  'Comfortable',
  { value: 'compact', label: 'Compact' },
  { value: 'focus', label: 'Focus', outline: true },
];

export function FormsKit(): React.JSX.Element {
  const titleRef = React.useRef<HTMLInputElement>(null);
  const loglineRef = React.useRef<HTMLTextAreaElement>(null);
  const askRef = React.useRef<HTMLInputElement>(null);
  const [title, setTitle] = React.useState('The letter arrives');
  const [logline, setLogline] = React.useState('A letter arrives forty years late.');
  const [ask, setAsk] = React.useState('');
  return (
    <>
      <Field
        label="Title"
        hint="2 chosen · 18 in the catalogue"
        value="The letter arrives"
        placeholder="Name the beat"
        kind="serif"
        select
        width={360}
        size="md"
        focused
      />
      {/*
        Wrapper mode: given neither `value` nor `placeholder`, `children` are the
        content of the well and the ring lights on its own from focus inside.
      */}
      <Field label="Cast" labelFor="cast-well" multiline size="lg">
        <EntityToken variant="inline" name="Vera Nakamura" />
      </Field>
      <Field label="Anchor" value="Y−40" kind="mono" disabled />

      {/*
        TextField / TextArea are that wrapper with a real control already in it,
        so every prop the well does not claim reaches the DOM node natively —
        `size` and `width` are the two the well does claim.
      */}
      <TextField
        ref={titleRef}
        id="title-input"
        label="Title"
        hint={`${title.length} / 60`}
        kind="serif"
        size="md"
        width={360}
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        maxLength={60}
        trailing={<Icon name="check" size={13} />}
        controlStyle={{ letterSpacing: '0.01em' }}
        style={{ marginTop: 8 }}
      />
      <TextField
        label="Story-time"
        kind="mono"
        size="sm"
        width={92}
        defaultValue="Y−40"
        placeholder="Y−00"
        type="text"
        name="story-time"
        readOnly
        focused={false}
      />
      <TextArea
        ref={loglineRef}
        label="Logline"
        hint={`${logline.split(' ').length} words`}
        kind="serif"
        size="lg"
        resize="vertical"
        rows={4}
        value={logline}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setLogline(e.target.value)}
        controlStyle={{ lineHeight: 1.6 }}
      />
      <TextArea
        label="Notes"
        kind="text"
        size="md"
        width="100%"
        defaultValue="Only you can read this."
        placeholder="A private line…"
        name="notes"
        resize="none"
        disabled
      />
      <Picker
        query="@ver"
        items={pickerItems}
        footer={<Kbd>⏎</Kbd>}
        teaching={<>Type <Kbd>[</Kbd> for story-time, <Kbd>@</Kbd> for an entity.</>}
        width={320}
      />
      <PromptField
        placeholder="A private line to Vera…"
        value=""
        audience="character"
        caret
        hintKey={<Kbd>⏎</Kbd>}
        trailing={<Icon name="lock" size={13} />}
      />
      {/* Wrapper mode: neither `value` nor `placeholder`, so `children` are the well. */}
      <PromptField audience={audiences[3]} aria-label="to the room">
        <EntityToken variant="inline" name="Vera Nakamura" />
      </PromptField>

      {/*
        PromptTextField is that addressed well with a real `<input>` in it, so the
        input's whole native surface stays reachable — the well claims only
        `audience`, `hintKey`, `trailing`, `focused` and `controlStyle`. `caret` is
        PromptField's stand-in for a control that is not there and must NOT be
        accepted here; the `@ts-expect-error` below fails the build if it ever is.
      */}
      <PromptTextField
        ref={askRef}
        id="ask-vera"
        audience="character"
        aria-label="ask vera"
        placeholder="ask vera…"
        value={ask}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAsk(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => void e}
        maxLength={240}
        name="ask"
        hintKey={<Kbd>⏎</Kbd>}
        trailing={<Icon name="lock" size={13} />}
        controlStyle={{ letterSpacing: '0.01em' }}
        style={{ marginTop: 8 }}
      />
      <PromptTextField
        audience="direction"
        aria-label="stage-direct vera"
        hintKey="stage-direct"
        placeholder="private note for vera's next turn…"
        defaultValue=""
        data-qm-dock="composer"
        readOnly
        focused={false}
      />
      {/* @ts-expect-error `caret` belongs to PromptField, not to the control-bearing pair. */}
      <PromptTextField audience="private" aria-label="a private line" caret />
      {/*
        SegmentedControl.onChange and Tabs.onChange report the chosen value, not
        a DOM form event — also absent from issue #1's inventory.
      */}
      <SegmentedControl
        options={segmentedOptions}
        value="compact"
        onChange={(value: string) => void value}
        className="qm-density"
      />
      <Tabs
        tabs={['Details', { value: 'consult', label: 'Consult' }]}
        value="Details"
        onChange={(value: string) => void value}
        className="qm-inspector-tabs"
      />
    </>
  );
}

/* ------------------------------------------------------------------ *
 * narrative — the surfaces issue #1 was filed against
 * ------------------------------------------------------------------ */

const beats: BeatSpineItem[] = [
  { id: 1, n: '01', text: 'The letter arrives', state: 'written', meta: <EraChip kind="time" size="sm">Y−40</EraChip> },
  { id: 2, n: '02', text: 'Sarita reads it aloud', state: 'here' },
  /* `ahead` is a position in the draft, not a material state — it shares
     `unwritten`'s hollow glyph rather than owning one in StateDot. */
  { id: 3, n: '03', text: 'She answers it', state: 'ahead' },
];

const versions: VersionEntry[] = [
  { id: 'v1', label: 'v1', origin: 'written', score: '7·5' },
  { id: 'v2', label: 'v2', origin: 'generated', score: '8·1', current: true },
];

export function NarrativeKit(): React.JSX.Element {
  return (
    <>
      {/*
        BeatCard.title is the beat's title (ReactNode), not the DOM tooltip.
        Passing an element here only compiles because the props Omit `title`
        from HTMLAttributes — this is the issue #1 regression guard.
      */}
      <BeatCard
        state="proposed"
        era="Y−40"
        entity="Sarita Fernandes"
        title={<em>The letter arrives, unopened</em>}
        directive="without naming it yet"
        signals={<AnnotationMark tone="advisory" glyph={<StateDot state="proposed" size={7} />}>drift 0.3</AnnotationMark>}
        actions={<Button variant="canon" size="sm">Make canon</Button>}
        className="qm-beat"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => void e}
        aria-label="Beat 1"
      >
        <NoteBlock tone="consult" size="sm">The consult read it as a refusal.</NoteBlock>
      </BeatCard>

      <BeatSpine beats={beats} showSpine onSelect={(beat: BeatSpineItem, index: number) => void [beat, index]} />

      {/*
        EntityToken.role is the narrative rank. The ARIA `role` attribute is
        Omitted and cannot be spread through; `aria-label` still can.
      */}
      <EntityToken
        name="Vera Nakamura"
        initials="VN"
        role="Ensign"
        kind="character"
        variant="chip"
        onDismiss={(e: React.MouseEvent) => void e}
        onClick={(e: React.MouseEvent) => void e}
        aria-label="Vera Nakamura, Ensign"
        className="qm-cast-chip"
      />
      <EntityToken variant="inline" name="Sarita Fernandes" />

      <EraChip kind="timeless" size="md">timeless</EraChip>
      <RouteChip state="invitation" icon={<Icon name="message" size={13} />} onClick={(e: React.MouseEvent) => void e}>
        No notes yet
      </RouteChip>

      <TimelineRow
        title={<em>The letter arrives</em>}
        meta="Luna Station · depth 1"
        who="VN"
        state={timelineRowStates[0]}
        selected
        here
        className="qm-timeline-row"
      />

      {/*
        VersionStrip.onSelect reports the chosen version, so the DOM onSelect
        text-selection handler is Omitted — second issue #1 regression guard.
      */}
      <VersionStrip
        versions={versions}
        label="VERSION"
        note="generated 2 minutes ago"
        onSelect={(v: VersionEntry, index: number) => void [v, index]}
        className="qm-version-strip"
      />
    </>
  );
}

/* ------------------------------------------------------------------ *
 * issue #11 — the seven that spread `...rest` but declared no `extends`
 *
 * Each of these forwards every unclaimed prop onto its root element: a `<span>`
 * for all but `NoteBlock`, which wraps a `<div>`. The types said otherwise, so
 * a consumer passing a prop the component already forwarded got an error. One
 * native attribute per component here fails the build if an interface stops
 * extending its DOM interface, and the handler signatures pin the element type.
 * ------------------------------------------------------------------ */

export function ForwardedNativeProps(): React.JSX.Element {
  return (
    <>
      <Avatar
        initials="VN"
        kind="character"
        id="cast-vera"
        title="Vera Nakamura"
        onClick={(e: React.MouseEvent<HTMLSpanElement>) => void e}
      />
      <Kbd variant="key" aria-keyshortcuts="Meta+S" id="kbd-save">⌘S</Kbd>
      {/* The glyph repeats a state already named in text, so it is hidden from AT. */}
      <StateDot state="canon" size={8} aria-hidden id="dot-canon" />
      <AnnotationMark tone="measure" title="lint score" lang="en">lint 7·5</AnnotationMark>
      <EraChip
        kind="time"
        size="sm"
        aria-label="story-time, minus forty"
        onClick={(e: React.MouseEvent<HTMLSpanElement>) => void e}
      >
        Y−40
      </EraChip>
      <NoteBlock tone="scene" size="md" role="note" id="stage-direction">
        She does not look up.
      </NoteBlock>
      {/* A `<span>` that acts as a button has to be given the role and the tab stop. */}
      <RouteChip
        state="count"
        role="button"
        tabIndex={0}
        aria-label="open prose"
        onKeyDown={(e: React.KeyboardEvent<HTMLSpanElement>) => void e}
      >
        prose · 377 words
      </RouteChip>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * navigation
 * ------------------------------------------------------------------ */

export function NavigationKit(): React.JSX.Element {
  return (
    <>
      <TopBar
        tall
        brand={false}
        breadcrumb="Aurelia / Act I"
        leading={<SaveStatus state="local" inline />}
        center={<EraChip kind="time">Y−40</EraChip>}
        className="qm-top-bar"
      >
        <Button variant="primary" size="sm">Open the room</Button>
      </TopBar>
      <StatusBar left="outline · depth 1" right="18 beats · 4 canon" />
      <PanelHeader audience="private" label="Notes" note="Only you can read this.">
        <Kbd variant="local">local</Kbd>
      </PanelHeader>
    </>
  );
}
