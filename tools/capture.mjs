// 화면 없는 크롬으로 페이지 전체를 캡처한다. 휴대폰 폭은 창 크기로는 줄일 수 없어서
// 개발자 도구 프로토콜로 화면 크기를 지정한다.
// 사용: node tools/capture.mjs <주소> <저장 파일> <폭> <높이> [mobile]
import {spawn} from 'node:child_process';
import {writeFileSync, mkdtempSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

const [url, out, w, h, mode] = process.argv.slice(2);
const width = Number(w), height = Number(h), mobile = mode === 'mobile';
const port = 9300 + Math.floor(Math.random() * 500);
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--hide-scrollbars',
  `--user-data-dir=${mkdtempSync(join(tmpdir(), 'cap-'))}`, `--remote-debugging-port=${port}`, 'about:blank',
], {stdio: 'ignore'});

const sleep = ms => new Promise(r => setTimeout(r, ms));
async function target() {
  for (let i = 0; i < 50; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = list.find(t => t.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(200);
  }
  throw new Error('chrome did not start');
}

try {
  const ws = new WebSocket(await target());
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let id = 0; const waiting = new Map();
  ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && waiting.has(m.id)) { waiting.get(m.id)(m); waiting.delete(m.id); } };
  const send = (method, params = {}) => new Promise(res => { const i = ++id; waiting.set(i, res); ws.send(JSON.stringify({id: i, method, params})); });

  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', {width, height, deviceScaleFactor: 1, mobile});
  if (mobile) await send('Emulation.setTouchEmulationEnabled', {enabled: true});
  await send('Page.navigate', {url});
  await sleep(2500);
  // 화면 밖 그림도 불러오고 글꼴이 준비될 때까지 기다린다.
  await send('Runtime.evaluate', {awaitPromise: true, expression: `(async () => {
    document.querySelectorAll('img[loading=lazy]').forEach(i => { i.loading = 'eager'; });
    await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.addEventListener('load', r, {once: true}); i.addEventListener('error', r, {once: true}); })));
    await document.fonts.ready; return 1; })()`});
  await sleep(500);
  const info = await send('Runtime.evaluate', {returnByValue: true, expression:
    `JSON.stringify({h: document.documentElement.scrollHeight, w: document.documentElement.scrollWidth, vw: innerWidth})`});
  const m = JSON.parse(info.result.result.value);
  const shot = await send('Page.captureScreenshot', {format: 'png', captureBeyondViewport: true,
    clip: {x: 0, y: 0, width, height: m.h, scale: 1}});
  writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
  console.log(out, JSON.stringify(m));
  ws.close();
} finally {
  chrome.kill();
}
