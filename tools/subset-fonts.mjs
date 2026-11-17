// 사이트 글꼴 만들기.
//
// 원본 Pretendard 가변 글꼴(content/fonts/PretendardVariable.woff2, 약 2MB)에서
// 사이트 문구에 쓰인 글자만 남겨 public/assets/fonts/bluemushroom-sans.woff2 를 만든다.
// `npm run build` 가 매번 먼저 실행하므로, 문구를 고쳐도 글자가 빠지지 않는다.
//
// Pretendard 는 SIL OFL 1.1 이고 'Pretendard' 가 예약 이름이다. 글자를 덜어 낸 파일은 고친 판이라
// 그 이름을 쓸 수 없어서, 글꼴 안의 이름을 'Bluemushroom Sans' 로 바꾼다. 저작권·라이선스 문구는 그대로 둔다.
//
// 사용: node tools/subset-fonts.mjs

import {readFileSync, writeFileSync, readdirSync, statSync, mkdirSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import subsetFont from 'subset-font';
import * as fontverter from 'fontverter';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = join(ROOT, 'content/fonts/PretendardVariable.woff2');
const OUT = join(ROOT, 'public/assets/fonts/bluemushroom-sans.woff2');
const RESERVED_NAME = 'Pretendard';
const NEW_NAME = 'Bluemushroom Sans';

// 화면 코드에 없지만 화면에 나올 수 있는 글자: 영문·숫자·기호 전부와 부품이 스스로 내는 한국어 문구.
const ASCII = Array.from({length: 0x7f - 0x20}, (_, i) => String.fromCharCode(0x20 + i)).join('');
const EXTRA = '·—–…→←↑↓©「」『』“”‘’•×' + '본문으로 건너뛰기 탐색 열기 닫기 메뉴';

function walk(dir) {
  return readdirSync(dir).flatMap(name => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function collectCharacters() {
  const files = [
    ...walk(join(ROOT, 'src')).filter(path => /\.(tsx?|jsx?)$/.test(path) && !path.includes('/themes/')),
    join(ROOT, 'index.html'),
  ];
  const text = files.map(path => readFileSync(path, 'utf8')).join('') + ASCII + EXTRA;
  return [...new Set([...text])].filter(ch => ch.codePointAt(0) >= 0x20).join('');
}

// ── 글꼴 안의 이름 바꾸기 (sfnt 의 name 표만 다시 쓴다) ──────────────────────────

function tableChecksum(bytes) {
  let sum = 0;
  for (let i = 0; i < bytes.length; i += 4) {
    let word = 0;
    for (let j = 0; j < 4; j++) {
      word = (word << 8) | (i + j < bytes.length ? bytes[i + j] : 0);
    }
    sum = (sum + (word >>> 0)) >>> 0;
  }
  return sum;
}

function decodeUtf16be(bytes) {
  let out = '';
  for (let i = 0; i + 1 < bytes.length; i += 2) {
    out += String.fromCharCode(bytes.readUInt16BE(i));
  }
  return out;
}

function encodeUtf16be(text) {
  const bytes = Buffer.alloc(text.length * 2);
  for (let i = 0; i < text.length; i++) {
    bytes.writeUInt16BE(text.charCodeAt(i), i * 2);
  }
  return bytes;
}

// 글꼴 이름이 들어가는 항목만 바꾼다: 1 가족, 3 고유 이름, 4 전체 이름, 6 PostScript 이름,
// 16 대표 가족, 18 Mac 전체 이름, 20 PostScript CID, 21 WWS 가족, 25 가변 글꼴 PostScript 접두어.
// 저작권(0)·라이선스(13, 14)·굵기 축 이름(256 이상)은 건드리지 않는다.
const NAME_IDS = new Set([1, 3, 4, 6, 16, 18, 20, 21, 25]);
const NO_SPACE_IDS = new Set([6, 20, 25]);

function rewriteNameTable(table) {
  if (table.readUInt16BE(0) !== 0) {
    throw new Error('name 표 형식이 0 이 아니어서 처리하지 않습니다.');
  }
  const count = table.readUInt16BE(2);
  const storage = table.readUInt16BE(4);
  const records = [];
  let renamed = 0;
  for (let i = 0; i < count; i++) {
    const at = 6 + i * 12;
    const record = {
      platformID: table.readUInt16BE(at),
      encodingID: table.readUInt16BE(at + 2),
      languageID: table.readUInt16BE(at + 4),
      nameID: table.readUInt16BE(at + 6),
    };
    const length = table.readUInt16BE(at + 8);
    const offset = table.readUInt16BE(at + 10);
    let raw = table.subarray(storage + offset, storage + offset + length);
    if (NAME_IDS.has(record.nameID)) {
      const isUtf16 = record.platformID === 0 || record.platformID === 3;
      const before = isUtf16 ? decodeUtf16be(raw) : raw.toString('latin1');
      const replacement = NO_SPACE_IDS.has(record.nameID) ? NEW_NAME.replace(/\s+/g, '') : NEW_NAME;
      const after = before.split(RESERVED_NAME).join(replacement);
      if (after !== before) {
        renamed++;
        raw = isUtf16 ? encodeUtf16be(after) : Buffer.from(after, 'latin1');
      }
    }
    records.push({...record, raw});
  }
  const header = Buffer.alloc(6 + count * 12);
  header.writeUInt16BE(0, 0);
  header.writeUInt16BE(count, 2);
  header.writeUInt16BE(header.length, 4);
  let offset = 0;
  records.forEach((record, i) => {
    const at = 6 + i * 12;
    header.writeUInt16BE(record.platformID, at);
    header.writeUInt16BE(record.encodingID, at + 2);
    header.writeUInt16BE(record.languageID, at + 4);
    header.writeUInt16BE(record.nameID, at + 6);
    header.writeUInt16BE(record.raw.length, at + 8);
    header.writeUInt16BE(offset, at + 10);
    offset += record.raw.length;
  });
  return {table: Buffer.concat([header, ...records.map(record => record.raw)]), renamed};
}

function renameFont(sfnt) {
  const tableCount = sfnt.readUInt16BE(4);
  const tables = [];
  for (let i = 0; i < tableCount; i++) {
    const at = 12 + i * 16;
    const offset = sfnt.readUInt32BE(at + 8);
    const length = sfnt.readUInt32BE(at + 12);
    tables.push({tag: sfnt.toString('latin1', at, at + 4), data: Buffer.from(sfnt.subarray(offset, offset + length))});
  }
  const name = tables.find(table => table.tag === 'name');
  const head = tables.find(table => table.tag === 'head');
  if (!name || !head) {
    throw new Error('글꼴에 name 또는 head 표가 없습니다.');
  }
  const rewritten = rewriteNameTable(name.data);
  name.data = rewritten.table;
  head.data.writeUInt32BE(0, 8); // 파일 전체 합계를 다시 계산하기 전에 비운다

  let offset = 12 + tableCount * 16;
  for (const table of tables) {
    table.offset = offset;
    offset += (table.data.length + 3) & ~3;
  }
  const out = Buffer.alloc(offset);
  sfnt.copy(out, 0, 0, 12);
  tables.forEach((table, i) => {
    const at = 12 + i * 16;
    out.write(table.tag, at, 'latin1');
    out.writeUInt32BE(tableChecksum(table.data), at + 4);
    out.writeUInt32BE(table.offset, at + 8);
    out.writeUInt32BE(table.data.length, at + 12);
    table.data.copy(out, table.offset);
  });
  out.writeUInt32BE((0xb1b0afba - tableChecksum(out)) >>> 0, head.offset + 8);
  return {font: out, renamed: rewritten.renamed};
}

// ── 실행 ────────────────────────────────────────────────────────────────

const characters = collectCharacters();
const source = readFileSync(SOURCE);
// 굵기는 본문(400)부터 제목(700)까지만 남긴다.
const subset = await subsetFont(source, characters, {
  targetFormat: 'sfnt',
  variationAxes: {wght: {min: 400, max: 700}},
});
const {font, renamed} = renameFont(Buffer.from(subset));
if (font.includes(Buffer.from(RESERVED_NAME + ' Variable', 'latin1')) || renamed === 0) {
  throw new Error('글꼴 이름을 바꾸지 못했습니다. name 표를 확인하세요.');
}
const woff2 = await fontverter.convert(font, 'woff2');
mkdirSync(dirname(OUT), {recursive: true});
writeFileSync(OUT, woff2);

const hangul = [...characters].filter(ch => ch >= '가' && ch <= '힣').length;
console.log(
  `wrote ${OUT.slice(ROOT.length + 1)}: ${characters.length} characters (${hangul} Hangul), ` +
    `${(woff2.length / 1024).toFixed(1)} KB, ${renamed} name records renamed to "${NEW_NAME}"`,
);
