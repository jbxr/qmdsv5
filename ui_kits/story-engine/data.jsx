const QM_SCENES = [
  { id: 'savior', title: 'Savior Reveal', when: 'Y−6 D1', era: 'time', cast: 'vera, cade-briggs',
    opened: '6 hours ago', words: 377, outline: '3 of 7 written', excerpt: '“It didn’t take me,” he said, more like a question than a statement. The figure didn’t move.' },
  { id: 'epigraphs', title: 'Epigraphs', when: 'timeless', era: 'timeless', cast: 'sarita-fernandes',
    opened: '6h ago', prose: 'prose · empty', proseState: 'count', outline: 'outline · 9 rows · 1 event', outlineState: 'count' },
  { id: 'mira', title: 'Mira Interview', when: 'timeless', era: 'timeless', cast: 'mira-sorokina',
    opened: '21d ago', prose: 'prose · empty', proseState: 'count', outline: 'start an outline', outlineState: 'invitation' },
  { id: 'dome', title: 'Dome Breach', when: 'Y−6 D1', era: 'time', cast: 'cade-briggs, boone',
    opened: '34d ago', prose: 'prose', proseState: 'unknown', outline: 'outline', outlineState: 'unknown' }
];

const QM_ROSTER = [
  { id: 'vera', name: 'vera', initials: 'VN', rank: 'Ensign — shuttle pilot', src: 'soul' },
  { id: 'cade-briggs', name: 'cade-briggs', initials: 'CB', rank: 'Lt. — security rotation', src: 'soul' },
  { id: 'ash-lucero', name: 'ash-lucero', initials: 'AL', rank: '', src: 'qm' },
  { id: 'boone', name: 'boone', initials: 'BC', rank: 'Dr. — geology', src: 'qm' },
  { id: 'mira-sorokina', name: 'mira-sorokina', initials: 'MS', rank: '', src: 'soul' }
];

const QM_STAGE_BEATS = [
  { text: 'The scientists wheel the apparatus into the annex', state: 'written' },
  { text: 'The corridor light shifts white to orange at 1009', state: 'written' },
  { text: 'Briggs kneels. The figure in the helmet does not move', state: 'here' },
  { text: '“Can you walk?” — the voice is human', state: 'written' },
  { text: 'He reads the nameplate: Ensign V. Nakamura', state: 'ahead' },
  { text: 'The seal order comes over the channel', state: 'ahead' },
  { text: 'He does not close the bulkhead', state: 'ahead' }
];

const QM_PROSE = [
  'He caught his own reflection in the opaque black mirror of her helmet: himself kneeling on the floor, cradling his shattered wrist, the iron sights of a standard-issue pistol trained between his eyes.',
  '“It didn’t take me,” he said, more like a question than a statement.',
  'The figure didn’t move.',
  '“Can you walk?” she asked, her voice sounding somewhat familiar despite being projected through the helmet’s speaker. But more importantly, it sounded human.'
];

const QM_COMPOSE_BEATS = [
  { n: 0, text: 'The scientists wheel the apparatus into the annex at 0850', slot: 1 },
  { n: 1, text: 'At 1009 the light changes: a wash of orange on the corridor wall', slot: 0 },
  { n: 2, text: 'Boots in the corridor, seven minutes later. The sergeant returns', slot: 1 },
  { n: 3, text: 'Briggs’s hand is on the seal control through ten counted seconds', slot: 1 },
  { n: 4, text: 'The apparatus has gone dark in its cradle and the hum has stopped', slot: 1 },
  { n: 5, text: 'In the pressurised tunnel to the control complex: the lead scientist', slot: 1 },
  { n: 6, text: 'Her shuttle comes off the pad with the cabin lights at quarter', slot: 1 }
];

const QM_CANDIDATES = [
  { slot: 0, run: 'B3 · run e0c01f', rank: 'rank 3', chosen: '1/7 chosen', ranked: false,
    beats: [{ beat: 'beat 1', lint: '6·5', tell: 'critical', fn: '0.9', chosen: false,
      text: 'At 1009 the light on the corridor wall shifted from white to orange. The change came without flicker, a wash of colour where before there had been only the cold glow of the station.' }] },
  { slot: 1, run: 'A · run 9c75f6', rank: 'rank 1', chosen: '6/7 chosen', ranked: true,
    beats: [{ beat: 'beat 0', lint: '7·5', tell: 'critical', fn: '0.9', chosen: true,
      text: 'At 0850 the corridor hum changed. Six of them wheeled the cradle through the blast door, the castors grinding on the deck plates. Cade Briggs met them at the docking collar.' }] },
  { slot: 2, run: 'B1 · run 311d26', rank: 'rank 2', chosen: '0/7 chosen', ranked: false,
    beats: [
      { beat: 'beat 0', lint: '6·4', tell: 'warning', fn: '0.9', chosen: false,
        text: 'The scientists came at 0850, six of them in clean-room whites, and the apparatus came with them on a wheeled cradle that hummed against the deck plating.' },
      { beat: 'beat 1', lint: '7·4', cut: true, chosen: false, selectable: true,
        text: 'The corridor ran empty for an hour. Briggs logged it secure at 0915, again at 0930, and at 1000 the word was beginning to feel like a lie he was telling himself on a schedule' }] }
];

const QM_YEARS = [
  { year: '−36', count: '1 event', events: [{ title: 'Dr. Boone Harlan Clay is born in West Texas', meta: 'birth · depth 1', who: 'BC', state: 'canon' }] },
  { year: '−35', count: '1 event', events: [{ title: 'Vera Nakamura is born on Earth, to an Osaka family', meta: 'birth · depth 1', who: 'VN', state: 'canon' }] },
  { year: '−28', count: '1 event', events: [{ title: 'Cade Briggs is born on Earth, Detroit Military District', meta: 'birth · depth 1', who: 'CB', state: 'canon' }] },
  { year: '−6', count: '8 events', events: [
    { title: 'At the Luna Station Incident, Vera Nakamura is on shift', meta: 'Luna Station · depth 1', who: 'VN', state: 'canon' },
    { title: 'Lt. Cade Briggs, age 22, junior security officer on rotation', meta: 'Luna Station · depth 1', who: 'CB', state: 'canon' },
    { title: 'The Luna Shaper Fragment, classified inert, begins to move', meta: 'artifact · depth 1', who: '—', state: 'canon' },
    { title: 'The dome breach order — critical for the prologue reveal', meta: 'proposed · depth 1', who: '—', state: 'proposed' },
    { title: 'Briggs disobeys the seal order. He does not close the bulkhead', meta: 'suggested · depth 1', who: 'CB', state: 'suggested' },
    { title: 'Briggs shoots his own squad — the men he had trained with', meta: 'casualty · depth 1', who: 'CB', state: 'canon' }
  ] }
];

const QM_YEARS_COLLAPSED = [
  { year: 'Y−40', count: '1', dots: ['proposed'], here: true },
  { year: 'Y−36', count: '1', dots: ['canon'] },
  { year: 'Y−35', count: '1', dots: ['canon'] },
  { year: 'Y−28', count: '1', dots: ['canon'] },
  { year: 'Y−26', count: '1', dots: ['canon'] },
  { year: 'Y−6', count: '8', dots: ['canon','canon','canon','proposed','canon','canon','suggested','canon'] },
  { year: 'Y−4', count: '3', dots: ['canon','canon','canon'] },
  { year: 'Y−1', count: '2', dots: ['canon','canon'] },
  { year: 'Y0', count: '11', dots: ['canon','canon','canon','canon','canon','canon','canon','suggested','canon','canon','canon'] },
  { year: 'Y3', count: '6', dots: ['canon','canon','canon','canon','canon','canon'] },
  { year: 'Y35', count: '9', dots: ['canon','canon','canon','canon','canon','canon','canon','canon','canon'] }
];

const QM_OUTLINE_ROWS = [
  'Its authenticity in the age of AI was noteworthy',
  'Its patterns and shape played tricks on the mind',
  'It was presumed these were optical illusions. But no human or machine could figure it out',
  'It became viewed as a threat by some, a divine gift by others, and eventually, an elaborate hoax by most',
  'Eventually it faded into the back of public consciousness, an object of curiosity, but nothing more'
];

const QM_HISTORY = [
  { what: 'Proposed by Consult · Sarita Fernandes', when: 'today, 09:41', state: 'suggested' },
  { what: 'Description edited — the directive “without naming it yet” added', when: 'today, 09:38', state: 'proposed' },
  { what: 'Re-anchored from Y0 to Y−40', when: 'today, 09:36', state: 'conflict' },
  { what: 'Created under Epigraphs', when: 'yesterday, 22:14', state: 'canon' }
];

Object.assign(window, {
  QM_SCENES, QM_ROSTER, QM_STAGE_BEATS, QM_PROSE, QM_COMPOSE_BEATS, QM_CANDIDATES,
  QM_YEARS, QM_YEARS_COLLAPSED, QM_OUTLINE_ROWS, QM_HISTORY
});
