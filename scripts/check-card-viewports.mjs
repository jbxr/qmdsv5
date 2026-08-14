/**
 * Renders every `@dsCard`-annotated page in headless Chrome and fails when the
 * content is taller than the viewport the annotation declares.
 *
 *   node scripts/check-card-viewports.mjs          measure and report
 *   node scripts/check-card-viewports.mjs --fix    grow any annotation that clips
 *
 * The gallery renders a card inside the box its annotation asks for, so an
 * under-declared height hides content with no error anywhere: the card simply
 * comes out shorter. `guidelines/brand-interaction.card.html` declared 410px
 * against 669px of content, which is why its DESTRUCTIVE section was never
 * visible to anyone (#22).
 *
 * Two things make the measurement trustworthy rather than merely automated:
 *
 *   - It settles before reading. Babel transforms the component cards after
 *     load, so height is sampled until three consecutive reads agree.
 *   - It refuses to measure in the wrong fonts. Every card reaches Google Fonts
 *     through `tokens/fonts.css`, and Spectral and IBM Plex do not have the
 *     metrics of the local fallbacks — a height measured against Georgia and
 *     system-ui is not the height the gallery will lay out. When the families
 *     are missing the card is SKIPPED, not passed and not failed, so a CI runner
 *     that cannot reach the CDN reports "not measured" instead of inventing a
 *     verdict in either direction.
 */
import * as fs from 'node:fs';
import * as http from 'node:http';
import * as os from 'node:os';
import * as path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FIX = process.argv.includes('--fix');

/**
 * Headroom added when `--fix` rewrites a height, then rounded up to the next ten
 * so the annotation reads like the hand-written ones. Every card that fits today
 * carries between 5 and 53px of slack, so the breathing room is the house
 * convention and a hairline of font-metric variance between one runner and the
 * next cannot reintroduce the clipping.
 */
const HEADROOM = 16;

/** `--fix` only ever grows a viewport. Over-declaring costs whitespace at the
 *  bottom of a card; under-declaring costs the content, silently. */
const roundUp = (height) => Math.ceil((height + HEADROOM) / 10) * 10;

/** The families the cards lay out in. A measurement in the fallbacks is not a
 *  measurement of this design system. */
const REQUIRED_FONTS = ['IBM Plex Sans', 'IBM Plex Mono', 'Spectral'];

const SKIP_DIRS = new Set(['node_modules', '.git', '.github', 'uploads', '.memsearch', '.serena']);

/* ---------------------------------------------------------------- cards -- */

const ANNOTATION = /<!--\s*@dsCard\b([^>]*?)-->/;

function findAnnotatedPages(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') && entry.name !== '.') continue;
    if (SKIP_DIRS.has(entry.name)) continue;
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

/* --------------------------------------------------------------- server -- */

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
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

/* --------------------------------------------------------------- chrome -- */

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

  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'qm-viewport-'));
  const child = spawn(binary, [
    '--headless=new',
    '--disable-gpu',
    // A visible scrollbar narrows the content box, which changes wrapping and so
    // changes the height. The declared width has to be the width text lays out in.
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

/* ------------------------------------------------------------------ cdp -- */

/** One websocket, sessions flattened onto it, promise per command id. */
class Devtools {
  #socket; #next = 1; #pending = new Map();

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
      const waiting = this.#pending.get(message.id);
      if (!waiting) return;
      this.#pending.delete(message.id);
      message.error ? waiting.reject(new Error(message.error.message)) : waiting.resolve(message.result);
    });
  }

  send(method, params = {}, sessionId) {
    const id = this.#next++;
    return new Promise((resolve, reject) => {
      this.#pending.set(id, { resolve, reject });
      this.#socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    });
  }

  close() { this.#socket.close(); }
}

/* -------------------------------------------------------------- measure -- */

/**
 * Reads the settled content height, and reports which of the required families
 * actually arrived so the caller can tell a real measurement from a fallback one.
 */
const MEASURE = `(async () => {
  const wanted = ${JSON.stringify(REQUIRED_FONTS)};

  // \`scrollHeight\` never reports less than the viewport, so on a card with room
  // to spare it returns the declared height and every annotation looks perfect.
  // Measure the real extent instead: the lowest bottom edge any laid-out element
  // reaches. Fixed elements are excluded — they travel with the viewport and are
  // never what pushes a card past its box.
  const read = () => {
    if (!document.body) return 0;
    let bottom = 0;
    const visit = (el) => {
      const styles = getComputedStyle(el);
      if (styles.display === 'none' || styles.position === 'fixed') return;
      const rect = el.getBoundingClientRect();
      if (rect.width || rect.height) bottom = Math.max(bottom, rect.bottom + window.scrollY);
      // A box that clips its own overflow extends exactly as far as itself — what
      // is inside scrolls, and an internal scroller is the card working, not the
      // gallery cutting it off. The story-engine shell is built out of these.
      if (styles.overflowY !== 'visible') return;
      for (const child of el.children) visit(child);
    };
    for (const child of document.body.children) visit(child);
    const body = getComputedStyle(document.body);
    bottom += parseFloat(body.paddingBottom) + parseFloat(body.marginBottom);
    return Math.ceil(Math.max(bottom, 0));
  };

  if (document.readyState !== 'complete') {
    await new Promise((r) => window.addEventListener('load', r, { once: true }));
  }

  // \`fonts.ready\` settles as soon as nothing is pending, which on a card that has
  // not painted its serif yet is immediately — and \`check()\` is false for a face
  // that is merely declared. Ask for each family by name so the fetch is actually
  // started, then wait for it.
  await Promise.all(wanted.map((f) => document.fonts.load('400 12px "' + f + '"').catch(() => {})));
  await document.fonts.ready;

  // The component cards are transformed by Babel after load, so the first
  // reading is of an empty root. Sample until three in a row agree.
  let height = read(), stable = 0;
  for (let i = 0; i < 100 && stable < 3; i++) {
    await new Promise((r) => setTimeout(r, 50));
    const next = read();
    stable = next === height ? stable + 1 : 0;
    height = next;
  }

  return {
    height,
    settled: stable >= 3,
    missingFonts: wanted.filter((f) => !document.fonts.check('12px "' + f + '"')),
    empty: !document.body || document.body.innerText.trim() === '',
  };
})()`;

async function measure(devtools, sessionId, url, card) {
  const failures = [];
  await devtools.send('Emulation.setDeviceMetricsOverride', {
    width: card.width, height: card.height, deviceScaleFactor: 1, mobile: false,
  }, sessionId);

  await devtools.send('Page.navigate', { url }, sessionId);

  const result = await devtools.send('Runtime.evaluate', {
    expression: MEASURE, awaitPromise: true, returnByValue: true,
  }, sessionId);

  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description ?? 'evaluation failed');
  }
  return { ...result.result.value, failures };
}

/* ------------------------------------------------------------------ fix -- */

function rewriteAnnotation(card, height) {
  const full = path.join(ROOT, card.file);
  const source = fs.readFileSync(full, 'utf8');
  const next = source.replace(
    new RegExp(`(<!--\\s*@dsCard\\b[^>]*?viewport=")${card.width}x${card.height}(")`),
    `$1${card.width}x${height}$2`);
  if (next === source) throw new Error(`could not rewrite the annotation in ${card.file}`);
  fs.writeFileSync(full, next);
}

/* ----------------------------------------------------------------- main -- */

const cards = findAnnotatedPages(ROOT);
if (!cards.length) {
  console.error('No @dsCard viewport annotations found.');
  process.exit(1);
}

const chrome = launchChrome();
if (!chrome) {
  console.log('SKIPPED: no Chrome or Chromium on PATH. Set CHROME_PATH to measure the cards.');
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
      const measured = await measure(devtools, sessionId, url, card);
      rows.push({ card, ...measured });
    } catch (error) {
      rows.push({ card, error: error.message });
    } finally {
      await devtools.send('Target.closeTarget', { targetId });
    }
  }
} finally {
  devtools.close();
  chrome.child.kill();
  server.close();
  // Chrome writes its profile out as it exits, so this races the kill above.
  // A leftover temp directory is not worth failing a green run over.
  try { fs.rmSync(chrome.profile, { recursive: true, force: true }); } catch { /* ignore */ }
}

/* --------------------------------------------------------------- report -- */

const skipped = rows.filter((r) => r.missingFonts?.length);
const broken = rows.filter((r) => !r.missingFonts?.length && (r.error || r.empty || r.settled === false));
const measured = rows.filter((r) => !skipped.includes(r) && !broken.includes(r));
const overflowing = measured.filter((r) => r.height > r.card.height);

const pad = (value, width) => String(value).padEnd(width);
const widest = Math.max(...rows.map((r) => r.card.file.length));

console.log(`${pad('card', widest)}  declared  actual  slack`);
for (const row of rows) {
  const { card } = row;
  if (skipped.includes(row)) {
    console.log(`${pad(card.file, widest)}  ${pad(card.height, 8)}  ${pad('—', 6)}  SKIPPED (fonts unavailable)`);
  } else if (row.error) {
    console.log(`${pad(card.file, widest)}  ${pad(card.height, 8)}  ${pad('—', 6)}  ERROR ${row.error}`);
  } else if (row.empty) {
    console.log(`${pad(card.file, widest)}  ${pad(card.height, 8)}  ${pad('—', 6)}  ERROR rendered nothing`);
  } else if (row.settled === false) {
    console.log(`${pad(card.file, widest)}  ${pad(card.height, 8)}  ${pad(row.height, 6)}  ERROR height never settled`);
  } else {
    const slack = card.height - row.height;
    console.log(`${pad(card.file, widest)}  ${pad(card.height, 8)}  ${pad(row.height, 6)}  ` +
      (slack < 0 ? `CLIPS ${-slack}px` : `${slack}`));
  }
}

if (skipped.length) {
  console.log(
    `\n${skipped.length} of ${rows.length} not measured: Spectral and IBM Plex did not load, so the ` +
    `layout is in fallback fonts and its height is not the gallery's. Not a failure — re-run with ` +
    `fonts.googleapis.com reachable.`);
}

if (FIX && overflowing.length) {
  for (const row of overflowing) {
    const height = roundUp(row.height);
    rewriteAnnotation(row.card, height);
    console.log(`  ${row.card.file}: ${row.card.height} → ${height}`);
  }
  console.log(
    `\nRewrote ${overflowing.length} annotation(s). \`_ds_manifest.json\` carries a copy of every ` +
    `viewport and is regenerated by the Design app, so it stays stale until the next bundle build.`);
  process.exit(0);
}

if (broken.length) {
  console.error(`\n${broken.length} card(s) could not be rendered. See the ERROR rows above.`);
  process.exit(1);
}

if (overflowing.length) {
  console.error(
    `\n${overflowing.length} card(s) declare a viewport shorter than their content. Everything below ` +
    `the declared height is invisible in the gallery. Run \`npm run cards:viewports -- --fix\` to ` +
    `widen the annotations, then check the card still reads.`);
  for (const row of overflowing) {
    console.error(`  ${row.card.file}: declared ${row.card.height}, needs ${row.height}`);
  }
  process.exit(1);
}

console.log(`\n${measured.length} card(s) measured, none clipping.`);
