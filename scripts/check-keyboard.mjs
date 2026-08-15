/**
 * Presses Tab through every `@dsCard`-annotated page in headless Chrome and
 * fails when something that answers a click cannot be reached, or can be
 * reached and shows no focus indicator.
 *
 *   node scripts/check-keyboard.mjs                 walk every card
 *   node scripts/check-keyboard.mjs --verbose       print every tab stop
 *   node scripts/check-keyboard.mjs forms           walk the cards matching "forms"
 *
 * Eight components shipped with ZERO tab stops between them (#35): `Tabs`, the
 * product's own navigation, could not be operated by keyboard at all, and had
 * been that way since the initial commit. `typecheck`, `adherence:check`,
 * `bundle:check` and `cards:viewports` were all green for every one of those
 * days, because none of it is a type error, a config drift, a stale artifact or
 * a layout overflow. It is a behaviour, and a behaviour only exists in a browser.
 *
 * So this check does not read the source. It drives a real Chrome, dispatches
 * real Tab keys, and asks what the browser actually did:
 *
 *   - Reachability is the tab order Chrome built, not a rule about `tabIndex`.
 *     A roving composite — a tablist, radiogroup or listbox where one member
 *     carries `tabIndex="0"` and the rest `-1` — is validated as a group: the
 *     group must own exactly one tab stop AND an arrow key pressed on it must
 *     actually move focus to another member. A group whose arrows do nothing is
 *     eight elements with one way in and no way on, which is the #35 bug wearing
 *     the correct attributes.
 *   - An indicator is what CHANGES between focused and blurred, measured on the
 *     element, its ancestors and its descendants. That is the only definition
 *     that covers all three shapes this repo ships: `Tabs` rings itself, `Field`
 *     rings the well ABOVE the input, and `Picker` rings an inserted span BELOW
 *     the option. A permanently-painted ring is not a focus indicator and does
 *     not count — that is the `focused` prop's specimen, and #31's fake input.
 *   - A tab stop whose only change is a `box-shadow` FAILS. #27 established it:
 *     box-shadow is dropped entirely under forced-colors, so a control that
 *     answers the browser's outline with `none` leaves a high-contrast user no
 *     indicator at all. `tokens/controls.css` ships the transparent outline that
 *     fixes this; a control reaching it is the pass condition.
 */
import * as fs from 'node:fs';
import * as http from 'node:http';
import * as os from 'node:os';
import * as path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const VERBOSE = process.argv.includes('--verbose');
const FILTER = process.argv.slice(2).filter((a) => !a.startsWith('--'))[0] ?? null;

const SKIP_DIRS = new Set(['node_modules', '.git', '.github', 'uploads', '.memsearch', '.serena']);

/**
 * A parallel worker's before/after copy of a card is not a card, and a leftover
 * one turning CI red is a failure about nobody's code. This repo is worked on by
 * several people at once and `_scratch_k1_before/ui_kits/story-engine/index.html`
 * was walked as a real surface while this check was being written.
 * `check-card-viewports.mjs` has the same exposure and no guard.
 */
const SCRATCH = /^_scratch/;

/* ------------------------------------------------------------- exempt -- */

/**
 * The deliberate exceptions, named rather than hidden in the detector. Each one
 * says which card, which element and why, so `grep EXEMPT` is the whole list and
 * a future reader can disagree with a specific line instead of with a silent
 * heuristic. `card: '*'` applies everywhere.
 *
 * A programmatically-focused container is the case this exists for. `Overlay`'s
 * dialog panel carries `tabIndex={-1}` and a bare `outline: none` — it is focused
 * by the trap on open so the first Tab starts inside the modal, and it is never
 * itself a tab stop, so #27's forced-colors rule does not apply to it. It is not
 * caught by the detector either (`dialog` is not an interactive role and the
 * panel sets no pointer cursor), so this entry is documentation of an intended
 * absence as much as a suppression.
 */
const EXEMPT = [
  {
    card: '*',
    selector: '[role="dialog"][tabindex="-1"], [role="alertdialog"][tabindex="-1"]',
    reason: 'modal container: programmatically focused on open, never a tab stop (#41)',
  },
];

/* -------------------------------------------------------------- cards -- */

const ANNOTATION = /<!--\s*@dsCard\b([^>]*?)-->/;

/**
 * The same set `cards:viewports` measures: every `@dsCard` page, not every
 * `*.card.html`. `ui_kits/story-engine/index.html` is an annotated card that is
 * not named like one, and it is where the route nav (#45) and the WritingRoom
 * scene grid (#44) live — the two keyboard-dead surfaces still open. A check
 * that iterated filenames would have missed both.
 */
function findAnnotatedPages(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') && entry.name !== '.') continue;
    if (SKIP_DIRS.has(entry.name) || SCRATCH.test(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) findAnnotatedPages(full, out);
    else if (entry.name.endsWith('.html')) {
      const head = fs.readFileSync(full, 'utf8').slice(0, 4096);
      const match = head.match(ANNOTATION);
      const viewport = match?.[1].match(/viewport="(\d+)x(\d+)"/);
      if (viewport) {
        out.push({
          file: path.relative(ROOT, full),
          width: Number(viewport[1]),
          height: Number(viewport[2]),
        });
      }
    }
  }
  return out.sort((a, b) => (a.file < b.file ? -1 : 1));
}

/* -------------------------------------------------------------- server -- */

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  // The story-engine kit loads its five screens as `type="text/babel"` sources.
  '.jsx': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
};

function serveRepo() {
  const server = http.createServer((req, res) => {
    const rel = decodeURIComponent(new URL(req.url, 'http://x').pathname).replace(/^\/+/, '');
    const full = path.join(ROOT, rel);
    if (!full.startsWith(ROOT) || !fs.existsSync(full) || fs.statSync(full).isDirectory()) {
      res.writeHead(404).end('not found');
      return;
    }
    res.writeHead(200, { 'content-type': MIME[path.extname(full)] ?? 'application/octet-stream' });
    fs.createReadStream(full).pipe(res);
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

/* -------------------------------------------------------------- chrome -- */

/** Where a headless Chrome or Chromium can be found, in preference order. */
function chromeCandidates() {
  const fromEnv = process.env.CHROME_PATH || process.env.CHROME_BIN;
  return [
    ...(fromEnv ? [fromEnv] : []),
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter((p) => { try { fs.accessSync(p, fs.constants.X_OK); return true; } catch { return false; } });
}

function launchChrome() {
  const [binary] = chromeCandidates();
  if (!binary) return null;

  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'qm-keyboard-'));
  const child = spawn(binary, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions',
    '--disable-background-networking',
    `--user-data-dir=${profile}`,
    '--remote-debugging-port=0',
    'about:blank',
  ], { stdio: ['ignore', 'ignore', 'pipe'] });

  const endpoint = new Promise((resolve, reject) => {
    let buffered = '';
    const timer = setTimeout(() => reject(new Error('Chrome did not report a DevTools endpoint')), 30_000);
    child.stderr.on('data', (chunk) => {
      buffered += chunk;
      const found = buffered.match(/ws:\/\/[^\s]+/);
      if (found) { clearTimeout(timer); resolve(found[0]); }
    });
    child.on('exit', (code) => { clearTimeout(timer); reject(new Error(`Chrome exited (${code})`)); });
  });

  return { child, profile, endpoint };
}

/* ----------------------------------------------------------------- cdp -- */

/** One websocket, sessions flattened onto it, promise per command id. */
class Devtools {
  #socket; #next = 1; #pending = new Map(); #listeners = new Set();

  static async connect(url) {
    const socket = new WebSocket(url);
    await new Promise((resolve, reject) => {
      socket.addEventListener('open', resolve, { once: true });
      socket.addEventListener('error', () => reject(new Error(`cannot reach ${url}`)), { once: true });
    });
    return new Devtools(socket);
  }

  constructor(socket) {
    this.#socket = socket;
    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.method) { for (const fn of this.#listeners) fn(message); return; }
      const waiting = this.#pending.get(message.id);
      if (!waiting) return;
      this.#pending.delete(message.id);
      message.error ? waiting.reject(new Error(message.error.message)) : waiting.resolve(message.result);
    });
  }

  on(fn) { this.#listeners.add(fn); return () => this.#listeners.delete(fn); }

  send(method, params = {}, sessionId) {
    const id = this.#next++;
    return new Promise((resolve, reject) => {
      this.#pending.set(id, { resolve, reject });
      this.#socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    });
  }

  close() { this.#socket.close(); }
}

/* ------------------------------------------------------------ page-side -- */

/**
 * The detector, as a string evaluated in the page.
 *
 * Interactivity is decided by three signals, in this order, and nothing else:
 *
 *   1. A native control — `button`, `a[href]`, `input`, `select`, `textarea`,
 *      `summary`, `[contenteditable]`.
 *   2. An interactive ARIA role. Composite CONTAINER roles (`tablist`,
 *      `listbox`, …) are deliberately NOT in this list: a tablist is not itself
 *      a control, its tabs are.
 *   3. `cursor: pointer`, taken only on the OUTERMOST element of a pointer
 *      subtree, because `cursor` inherits and every span inside a button would
 *      otherwise be a control of its own.
 *
 * Signal 3 is the one that earns the check its keep. React attaches its
 * listeners at the root, so `onclick` is absent from the DOM and a plain `<div
 * onClick>` is invisible to 1 and 2 — which is exactly what #35's eight
 * components were. In this design system a clickable thing shows the pointer
 * cursor, so `cursor: pointer` is the house signature of a handler.
 *
 * What it misses, stated rather than discovered later:
 *   - A handler on an element that does NOT set `cursor: pointer`. Nothing in
 *     the repo is shaped that way, and the alternative — flagging every element
 *     and asking the author — is the noise that gets a check disabled.
 *   - A clickable element nested inside another pointer-cursor element, unless
 *     it is a native control or carries a role. Both outer and inner would need
 *     to be handlers, which no component here does.
 *   - Anything only reachable after an interaction the check does not perform:
 *     a menu that opens on click, a second page of a wizard. The check walks the
 *     card as it renders.
 *   - SVG content, skipped whole. It is iconography here, never a control.
 * It over-flags in one known direction: a non-interactive element given
 * `cursor: pointer` decoratively. That is a finding worth having.
 */
const PAGE = String.raw`
window.__qmkb = (() => {
  const INTERACTIVE_ROLES = new Set([
    'button', 'tab', 'option', 'radio', 'link', 'checkbox', 'switch',
    'menuitem', 'menuitemcheckbox', 'menuitemradio', 'combobox', 'slider',
    'spinbutton', 'textbox', 'searchbox', 'treeitem'
  ]);
  const COMPOSITE_ROLES = new Set([
    'tablist', 'radiogroup', 'listbox', 'menu', 'menubar', 'toolbar', 'tree', 'grid'
  ]);
  const NATIVE = 'button, a[href], input:not([type="hidden"]), select, textarea, summary, [contenteditable=""], [contenteditable="true"]';
  const HTML_NS = 'http://www.w3.org/1999/xhtml';

  const roleOf = (el) => (el.getAttribute('role') || '').trim().toLowerCase();

  const visible = (el) => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };

  // A disabled control is correctly out of the tab order, and an inert subtree is
  // the background behind an open modal — frozen on purpose (#30).
  const off = (el) =>
    el.disabled === true ||
    el.getAttribute('aria-disabled') === 'true' ||
    el.closest('[inert]') !== null ||
    el.closest('[aria-hidden="true"]') !== null;

  const why = (el) => {
    if (el.matches(NATIVE)) {
      // A <label for> shows the pointer cursor and forwards the click; the tab
      // stop is the control it points at, which is separately a candidate.
      return 'native';
    }
    if (INTERACTIVE_ROLES.has(roleOf(el))) return 'role';
    if (el.hasAttribute('onclick')) return 'onclick';
    if (getComputedStyle(el).cursor === 'pointer') {
      for (let p = el.parentElement; p && p !== document.documentElement; p = p.parentElement) {
        if (getComputedStyle(p).cursor === 'pointer') return null;
      }
      return 'cursor';
    }
    return null;
  };

  const skip = (el) =>
    el.namespaceURI !== HTML_NS ||
    el.closest('svg') !== null ||
    (el.tagName === 'LABEL' && el.control != null);

  const collect = () => {
    const out = [];
    for (const el of document.querySelectorAll('*')) {
      if (skip(el) || !visible(el) || off(el)) continue;
      const reason = why(el);
      if (reason) out.push({ el, reason });
    }
    return out;
  };

  const cssPath = (el) => {
    const parts = [];
    for (let n = el; n && n.nodeType === 1 && parts.length < 6; n = n.parentElement) {
      if (n.id) { parts.unshift('#' + n.id); break; }
      let sel = n.tagName.toLowerCase();
      const role = n.getAttribute && n.getAttribute('role');
      if (role) sel += '[role="' + role + '"]';
      const sibs = n.parentElement ? [...n.parentElement.children].filter((c) => c.tagName === n.tagName) : [];
      if (sibs.length > 1) sel += ':nth-of-type(' + (sibs.indexOf(n) + 1) + ')';
      parts.unshift(sel);
    }
    return parts.join(' > ');
  };

  const describe = (el) => ({
    tag: el.tagName.toLowerCase(),
    role: roleOf(el) || null,
    tabindex: el.hasAttribute('tabindex') ? Number(el.getAttribute('tabindex')) : null,
    text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 44),
    selector: cssPath(el),
  });

  // The set of nodes a focus indicator could plausibly be painted on: the element
  // itself, a wrapper above it (Field rings the well, not the input), and its own
  // subtree (Picker rings an inserted span inside the option).
  const around = (el) => {
    const nodes = [el];
    for (let p = el.parentElement, i = 0; p && i < 5; p = p.parentElement, i++) nodes.push(p);
    const kids = el.querySelectorAll('*');
    for (let i = 0; i < kids.length && i < 60; i++) nodes.push(kids[i]);
    return nodes;
  };

  // Only nodes actually painting something are recorded, as a multiset of
  // strings. What the element gained on focus is the difference between the
  // focused reading and the blurred one, so a ring that is always there — a
  // decorative one, or the "focused" prop on a specimen Field — is in both and
  // cancels out. It is not a focus indicator and this refuses to call it one.
  const signature = (el) => {
    const out = [];
    for (const n of around(el)) {
      const cs = getComputedStyle(n);
      const style = cs.outlineStyle;
      const width = parseFloat(cs.outlineWidth) || 0;
      // 'auto' is Chrome's own ring, whose width is not always reported.
      const outline = style !== 'none' && (style === 'auto' || width > 0);
      const shadow = cs.boxShadow && cs.boxShadow !== 'none';
      if (!outline && !shadow) continue;
      out.push({
        key: n.tagName + '|' + cs.outlineStyle + ' ' + cs.outlineWidth + ' ' + cs.outlineColor +
             ' @' + cs.outlineOffset + '|' + cs.boxShadow,
        outline,
      });
    }
    return out;
  };

  const settle = async () => {
    if (document.readyState !== 'complete') {
      await new Promise((r) => window.addEventListener('load', r, { once: true }));
    }
    // Babel transforms the cards after load, so the first reading is of an empty
    // root. Sample until three in a row agree — but an EMPTY page is stable too,
    // and stability alone would have passed the whole story-engine kit at zero
    // controls: it loads five .jsx files over XHR and polls until they arrive, so
    // it is reliably still blank three readings in. Nothing counts as settled
    // until something has rendered.
    let last = '', stable = 0;
    for (let i = 0; i < 200 && stable < 3; i++) {
      await new Promise((r) => setTimeout(r, 50));
      const now = document.getElementsByTagName('*').length + ':' + collect().length;
      const rendered = !!document.body && document.body.innerText.trim() !== '';
      stable = rendered && now === last ? stable + 1 : 0;
      last = now;
    }
    return stable >= 3;
  };

  return {
    COMPOSITE_ROLES, collect, describe, signature, cssPath, roleOf, settle,
    cands: [], groups: [], stops: [],
  };
})();
`;

/**
 * Collects the candidates and the composite groups once the card has settled.
 * Takes the EXEMPT selectors as an argument rather than hard-coding them here,
 * so the one list at the top of this file is the whole list.
 */
const collectExpression = (exempt) => String.raw`(async () => {
  const EXEMPT = ${JSON.stringify(exempt)};
  const kb = window.__qmkb;
  const settled = await kb.settle();
  kb.cands = kb.collect();

  const groupEls = [];
  const cands = kb.cands.map(({ el, reason }) => {
    let g = null;
    for (let p = el.parentElement; p; p = p.parentElement) {
      if (kb.COMPOSITE_ROLES.has(kb.roleOf(p))) { g = p; break; }
    }
    let gi = -1;
    if (g) { gi = groupEls.indexOf(g); if (gi < 0) { gi = groupEls.length; groupEls.push(g); } }
    const hit = EXEMPT.find((e) => { try { return el.matches(e.selector); } catch { return false; } });
    return { ...kb.describe(el), reason, group: gi < 0 ? null : gi, exempt: hit ? hit.reason : null };
  });

  kb.groups = groupEls;
  kb.members = groupEls.map((_, i) => kb.cands.filter((_, j) => cands[j].group === i).map((c) => c.el));
  return {
    settled,
    empty: !document.body || document.body.innerText.trim() === '',
    cands,
    groups: groupEls.map((g) => ({ role: kb.roleOf(g), selector: kb.cssPath(g), label: (g.getAttribute('aria-label') || '').slice(0, 40) })),
  };
})()`;

/** Reads whichever element the last Tab landed on, after React has re-rendered. */
const STOP = String.raw`(async () => {
  // A ring driven by React state lands a tick after the focus event; a signature
  // read in the same turn is the unfocused one and every control looks bare.
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  await new Promise((r) => setTimeout(r, 60));
  const kb = window.__qmkb;
  const a = document.activeElement;
  if (!a || a === document.body || a === document.documentElement) return { end: true };
  const seen = kb.stops.findIndex((s) => s.el === a);
  if (seen >= 0) return { wrapped: true, at: seen };
  kb.stops.push({ el: a });
  return {
    index: kb.cands.findIndex((c) => c.el === a),
    desc: kb.describe(a),
    sig: kb.signature(a),
  };
})()`;

/** The unfocused reading of every element the walk stopped on. */
const BASELINE = String.raw`(async () => {
  const kb = window.__qmkb;
  if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  await new Promise((r) => setTimeout(r, 120));
  return kb.stops.map((s) => kb.signature(s.el));
})()`;

/* ------------------------------------------------------------- driving -- */

const TAB = { key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9 };
const ARROWS = {
  ArrowRight: { key: 'ArrowRight', code: 'ArrowRight', windowsVirtualKeyCode: 39, nativeVirtualKeyCode: 39 },
  ArrowDown: { key: 'ArrowDown', code: 'ArrowDown', windowsVirtualKeyCode: 40, nativeVirtualKeyCode: 40 },
};

async function press(devtools, sessionId, key) {
  await devtools.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', ...key }, sessionId);
  await devtools.send('Input.dispatchKeyEvent', { type: 'keyUp', ...key }, sessionId);
}

async function evaluate(devtools, sessionId, expression) {
  const result = await devtools.send('Runtime.evaluate', {
    expression, awaitPromise: true, returnByValue: true,
  }, sessionId);
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description ?? 'evaluation failed');
  }
  return result.result.value;
}

/** True when an arrow press on the group's tab stop moves focus to a sibling. */
async function arrowsMove(devtools, sessionId, groupIndex) {
  const focused = await evaluate(devtools, sessionId, String.raw`(() => {
    const kb = window.__qmkb;
    const g = kb.groups[${groupIndex}];
    const members = kb.members[${groupIndex}];
    const stop = members.find((el) => el.getAttribute('tabindex') === '0') || members[0];
    if (!stop) return false;
    stop.focus();
    kb.arrowFrom = stop;
    kb.arrowGroup = g;
    return document.activeElement === stop;
  })()`);
  if (!focused) return false;

  for (const arrow of [ARROWS.ArrowRight, ARROWS.ArrowDown]) {
    await press(devtools, sessionId, arrow);
    const moved = await evaluate(devtools, sessionId, String.raw`(async () => {
      await new Promise((r) => setTimeout(r, 60));
      const kb = window.__qmkb;
      const a = document.activeElement;
      return !!a && a !== kb.arrowFrom && kb.arrowGroup.contains(a);
    })()`);
    if (moved) return true;
  }
  return false;
}

/* --------------------------------------------------------------- walk -- */

/** Multiset difference: what the focused reading has that the blurred one lacks. */
function gained(focused, blurred) {
  const pool = new Map();
  for (const entry of blurred) pool.set(entry.key, (pool.get(entry.key) ?? 0) + 1);
  const added = [];
  for (const entry of focused) {
    const left = pool.get(entry.key) ?? 0;
    if (left > 0) pool.set(entry.key, left - 1);
    else added.push(entry);
  }
  return added;
}

async function walk(devtools, sessionId, url, card) {
  const scripts = new Map();
  const failed = [];
  const off = devtools.on((message) => {
    if (message.sessionId !== sessionId) return;
    if (message.method === 'Network.requestWillBeSent') {
      const { requestId, type, request } = message.params;
      if (type === 'Script' && !request.url.startsWith('http://127.0.0.1')) scripts.set(requestId, request.url);
    } else if (message.method === 'Network.loadingFailed') {
      const url = scripts.get(message.params.requestId);
      if (url) failed.push(url);
    }
  });

  try {
    await devtools.send('Network.enable', {}, sessionId);
    await devtools.send('Emulation.setFocusEmulationEnabled', { enabled: true }, sessionId);
    await devtools.send('Emulation.setDeviceMetricsOverride', {
      width: card.width, height: card.height, deviceScaleFactor: 1, mobile: false,
    }, sessionId);
    await devtools.send('Page.addScriptToEvaluateOnNewDocument', { source: PAGE }, sessionId);
    await devtools.send('Page.navigate', { url }, sessionId);

    const { settled, empty, cands, groups } = await evaluate(devtools, sessionId, collectExpression(
      EXEMPT.filter((e) => e.card === '*' || card.file.includes(e.card))));
    if (failed.length) return { offline: failed };
    if (empty) return { empty: true };

    // Tab past every candidate and then some — an element can be a tab stop
    // without being a candidate, and those stops are checked for an indicator
    // too. Capped so a focus trap (Overlay's, #30) cannot spin forever.
    const stops = [];
    const limit = Math.min(cands.length * 2 + 30, 240);
    for (let i = 0; i < limit; i++) {
      await press(devtools, sessionId, TAB);
      const stop = await evaluate(devtools, sessionId, STOP);
      if (stop.end || stop.wrapped) break;
      stops.push(stop);
    }

    const baselines = await evaluate(devtools, sessionId, BASELINE);
    for (let i = 0; i < stops.length; i++) {
      stops[i].added = gained(stops[i].sig ?? [], baselines[i] ?? []);
      delete stops[i].sig;
    }

    const arrows = [];
    for (let g = 0; g < groups.length; g++) arrows.push(await arrowsMove(devtools, sessionId, g));

    return { settled, cands, groups, stops, arrows };
  } finally {
    off();
  }
}

/* -------------------------------------------------------------- judge -- */

function judge(card, run) {
  const { cands, groups, stops, arrows } = run;
  const failures = [];
  const notes = [];

  const reached = new Set(stops.map((s) => s.index).filter((i) => i >= 0));

  // A composite is entered once and traversed with arrows, so its members are
  // validated as a group. Getting this wrong in the other direction would flag
  // every correct tablist, radiogroup and listbox in the repo.
  const groupState = groups.map((g, i) => {
    const members = cands.filter((c) => c.group === i);
    const zero = members.filter((m) => m.tabindex === 0);
    const entered = zero.filter((m) => reached.has(cands.indexOf(m)));
    return { ...g, members, zero, entered, arrows: arrows[i] };
  });

  for (const g of groupState) {
    if (!g.members.length) continue;
    if (!g.entered.length) {
      failures.push({
        what: `${g.role} "${g.label || g.selector}"`,
        why: `no member is a tab stop — ${g.members.length} control(s) unreachable`,
      });
    } else if (g.members.length > 1 && !g.arrows) {
      failures.push({
        what: `${g.role} "${g.label || g.selector}"`,
        why: `entered at one member but arrow keys move nothing — the other ${g.members.length - 1} are unreachable`,
      });
    }
    if (g.zero.length > 1) {
      // Not a failure: every one of them IS reachable. It is simply not roving,
      // and a strip that costs eight Tab presses to cross is the thing the
      // pattern exists to prevent.
      notes.push(`${g.role} "${g.label || g.selector}" has ${g.zero.length} members at tabIndex 0; a roving composite takes one tab stop, not one each`);
    }
  }

  let exempted = 0;
  for (const [i, c] of cands.entries()) {
    if (reached.has(i)) continue;
    // Exemption is matched page-side against the EXEMPT selectors; a candidate
    // that matched carries its reason, so the report says which line let it past.
    if (c.exempt) { exempted++; notes.push(`exempt: <${c.tag}> — ${c.exempt}`); continue; }
    // A roving member is reachable when its group is entered and arrows carry
    // focus on from there. Both are asserted on the group above, so a member
    // that is not itself a tab stop is not separately a failure — this is the
    // branch that keeps every correct ARIA composite in the repo out of the
    // report, and it is the whole difference between this check and a naive
    // "every interactive element must have tabIndex 0".
    const g = c.group == null ? null : groupState[c.group];
    if (g && g.entered.length && (g.members.length === 1 || g.arrows)) continue;
    failures.push({
      what: `<${c.tag}${c.role ? ` role="${c.role}"` : ''}> ${c.text ? `“${c.text}”` : ''}`.trim(),
      // Found by the pointer cursor and nothing else: the cursor is the whole
      // claim, so name both honest answers rather than assuming the element is a
      // broken control. Sometimes it is decoration that should not cursor.
      why: c.reason === 'cursor'
        ? `shows a pointer cursor and no Tab press can reach it (tabindex ${c.tabindex ?? 'absent'}). ` +
          `Either it answers a click — then it needs a role, a tab stop and Enter/Space — or it does ` +
          `not, and must not cursor like it does.`
        : `not reachable by Tab (found by ${c.reason}, tabindex ${c.tabindex ?? 'absent'})`,
      where: c.selector,
    });
  }

  for (const s of stops) {
    const d = s.desc;
    const id = `<${d.tag}${d.role ? ` role="${d.role}"` : ''}> ${d.text ? `“${d.text}”` : ''}`.trim();
    if (!s.added.length) {
      failures.push({ what: id, why: 'is a tab stop and paints no focus indicator at all', where: d.selector });
    } else if (!s.added.some((a) => a.outline)) {
      failures.push({
        what: id,
        where: d.selector,
        why: 'focus is shown by box-shadow only — box-shadow is dropped under forced-colors, ' +
             'so a high-contrast user gets no indicator (#27). Add --qm-focus-outline.',
      });
    }
  }

  return { failures, notes, exempted, groupState };
}

/* ---------------------------------------------------------------- main -- */

let cards = findAnnotatedPages(ROOT);
if (FILTER) cards = cards.filter((c) => c.file.includes(FILTER));
if (!cards.length) {
  console.error(FILTER ? `No @dsCard page matches "${FILTER}".` : 'No @dsCard viewport annotations found.');
  process.exit(1);
}

const chrome = launchChrome();
if (!chrome) {
  console.log('SKIPPED: no Chrome or Chromium on PATH. Set CHROME_PATH to walk the cards.');
  process.exit(0);
}

const { server, port } = await serveRepo();
const devtools = await Devtools.connect(await chrome.endpoint);

const rows = [];
try {
  for (const card of cards) {
    const { targetId } = await devtools.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await devtools.send('Target.attachToTarget', { targetId, flatten: true });
    try {
      await devtools.send('Page.enable', {}, sessionId);
      const url = `http://127.0.0.1:${port}/${card.file.split(path.sep).join('/')}`;
      const run = await walk(devtools, sessionId, url, card);
      rows.push({ card, run, ...(run.cands ? judge(card, run) : {}) });
    } catch (error) {
      rows.push({ card, run: { error: error.message } });
    } finally {
      await devtools.send('Target.closeTarget', { targetId });
    }
  }
} finally {
  devtools.close();
  chrome.child.kill();
  server.close();
  try { fs.rmSync(chrome.profile, { recursive: true, force: true }); } catch { /* ignore */ }
}

/* -------------------------------------------------------------- report -- */

const pad = (value, width) => String(value).padEnd(width);
const widest = Math.max(...rows.map((r) => r.card.file.length), 4);

console.log(`${pad('card', widest)}  controls  stops  status`);
for (const row of rows) {
  const { card, run } = row;
  const cell = (a, b, status) => console.log(`${pad(card.file, widest)}  ${pad(a, 8)}  ${pad(b, 5)}  ${status}`);
  if (run.error) cell('—', '—', `ERROR ${run.error}`);
  else if (run.offline) cell('—', '—', `SKIPPED (${run.offline.length} script(s) unreachable)`);
  else if (run.empty) cell('—', '—', 'ERROR rendered nothing');
  else if (run.settled === false) cell('—', '—', 'ERROR never settled');
  else cell(run.cands.length, run.stops.length,
    row.failures.length ? `${row.failures.length} FAILING` : run.cands.length ? 'ok' : '—');
}

const skipped = rows.filter((r) => r.run.offline);
const broken = rows.filter((r) => r.run.error || r.run.empty || r.run.settled === false);
const failing = rows.filter((r) => r.failures?.length);

if (VERBOSE) {
  for (const row of rows.filter((r) => r.run.stops)) {
    console.log(`\n${row.card.file} — ${row.run.stops.length} tab stop(s), ${row.run.groups.length} composite(s)`);
    for (const [i, s] of row.run.stops.entries()) {
      const ring = s.added.some((a) => a.outline) ? 'ring+outline' : s.added.length ? 'box-shadow only' : 'NONE';
      console.log(`  ${String(i + 1).padStart(2)}. <${s.desc.tag}${s.desc.role ? ` role=${s.desc.role}` : ''}> ${JSON.stringify(s.desc.text)} — ${ring}`);
    }
    for (const g of row.groupState ?? []) {
      console.log(`  [${g.role}] ${g.members.length} member(s), ${g.zero.length} at tabIndex 0, entered ${g.entered.length}, arrows ${g.arrows ? 'move' : 'DO NOT MOVE'}`);
    }
  }
}

for (const row of rows) {
  for (const note of row.notes ?? []) console.log(`\nnote  ${row.card.file}: ${note}`);
}

if (skipped.length) {
  console.log(
    `\n${skipped.length} of ${rows.length} not walked: the card's scripts did not load, so nothing ` +
    `rendered and there is no tab order to check. Not a failure — re-run with unpkg.com reachable.`);
}

if (broken.length) {
  console.error(`\n${broken.length} card(s) could not be walked. See the ERROR rows above.`);
}

if (failing.length) {
  console.error(`\nKeyboard failures:\n`);
  for (const row of failing) {
    console.error(`  ${row.card.file}`);
    for (const f of row.failures) {
      console.error(`    ${f.what}`);
      console.error(`      ${f.why}`);
      if (f.where) console.error(`      at  ${f.where}`);
    }
    console.error('');
  }
  console.error(
    `Every control ships as a control: a <button>, or the role, the tab stop and the Enter/Space\n` +
    `handling that stand in for one. A set of them takes ONE tab stop and arrows between —\n` +
    `see guidelines/brand-interaction.card.html.`);
}

if (broken.length || failing.length) process.exit(1);

const walked = rows.filter((r) => r.run.stops);
const controls = walked.reduce((n, r) => n + r.run.cands.length, 0);
const exempted = walked.reduce((n, r) => n + (r.exempted ?? 0), 0);
console.log(
  `\n${walked.length} card(s) walked, ${controls} control(s), all reachable and all ringed` +
  (exempted ? `, ${exempted} exempt (see EXEMPT in ${path.relative(ROOT, fileURLToPath(import.meta.url))}).` : '.'));
