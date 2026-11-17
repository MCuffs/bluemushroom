#!/usr/bin/env python3
"""content/dadwar-privacy.md 를 public/dadwar/privacy/index.html 로 바꾼다.

문구는 손대지 않고 그대로 옮긴다. 지원하는 문법은 처리방침 원문이 쓰는 것뿐이다:
'# 제목', '## 소제목', 빈 줄로 나뉜 문단, [글자](주소) 링크.
제목 바로 아래의 '시행일/운영자/문의' 묶음은 목록으로 보여 준다.

사용: python3 tools/build_privacy.py
"""
import html
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "content" / "dadwar-privacy.md"
# docs/ 는 빌드 결과물이라 직접 쓰지 않는다. public/ 에 쓰고 `npm run build` 로 docs/ 에 반영한다.
OUT = ROOT / "public" / "dadwar" / "privacy" / "index.html"

LINK = re.compile(r"\[([^\]]+)\]\((https?://[^)\s]+)\)")
# 영문·숫자만 주소로 본다. \w 는 한글도 잡아서 "…@naver.com으로"의 조사까지 주소에 넣는다.
EMAIL = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+")


def inline(text: str) -> str:
    """링크와 이메일만 바꾸고 나머지는 그대로 이스케이프한다."""
    out, pos = [], 0
    for m in LINK.finditer(text):
        out.append(plain(text[pos:m.start()]))
        out.append('<a href="%s" rel="noopener">%s</a>' % (html.escape(m.group(2), quote=True), html.escape(m.group(1))))
        pos = m.end()
    out.append(plain(text[pos:]))
    return "".join(out)


def plain(text: str) -> str:
    out, pos = [], 0
    for m in EMAIL.finditer(text):
        out.append(html.escape(text[pos:m.start()]))
        addr = html.escape(m.group(0), quote=True)
        out.append('<a href="mailto:%s">%s</a>' % (addr, addr))
        pos = m.end()
    out.append(html.escape(text[pos:]))
    return "".join(out)


def convert(md: str):
    title, body = "", []
    blocks = [b.strip("\n") for b in re.split(r"\n\s*\n", md.strip())]
    for i, block in enumerate(blocks):
        lines = block.split("\n")
        if block.startswith("# "):
            title = block[2:].strip()
            body.append("<h1>%s</h1>" % html.escape(title))
        elif block.startswith("## "):
            body.append("<h2>%s</h2>" % html.escape(block[3:].strip()))
        elif i == 1 and len(lines) > 1:
            items = "".join("<li>%s</li>" % inline(line.strip()) for line in lines)
            body.append('<ul class="meta">%s</ul>' % items)
        else:
            body.append("<p>%s</p>" % inline(" ".join(line.strip() for line in lines)))
    return title, "\n      ".join(body)


PAGE = """<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title} | 파랑버섯 스튜디오</title>
  <meta name="description" content="파랑버섯 스튜디오가 제공하는 게임 「아빠 전쟁」의 개인정보 처리방침입니다.">
  <meta name="theme-color" content="#111114">
  <link rel="icon" type="image/png" href="../../assets/favicon-64.png">
  <link rel="apple-touch-icon" href="../../assets/icon-180.png">
  <link rel="stylesheet" href="../../assets/site.css?v=2">
</head>
<body>

<header class="top">
  <div class="wrap">
    <a class="brand" href="../../" aria-label="파랑버섯 스튜디오 첫 화면">
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M18 27h12l2 13a3 3 0 0 1-3 3.4H19A3 3 0 0 1 16 40z" fill="#fcf8ea" stroke="#111114" stroke-width="3" stroke-linejoin="round"/>
        <path d="M4 25C4 13 13 5 24 5s20 8 20 20c0 2.6-2 4-4.4 4H8.4C6 29 4 27.6 4 25z" fill="#1b74ff" stroke="#111114" stroke-width="3" stroke-linejoin="round"/>
        <circle cx="16" cy="17" r="3.6" fill="#fcf8ea"/>
        <circle cx="29" cy="13" r="2.6" fill="#fcf8ea"/>
        <circle cx="33" cy="22" r="3" fill="#fcf8ea"/>
      </svg>
      <span>파랑버섯 스튜디오<small>Bluemushroom studio</small></span>
    </a>
    <nav class="nav" aria-label="주요 메뉴">
      <a href="../../#p3">게임</a>
      <a href="../../#p5">스튜디오</a>
    </nav>
  </div>
</header>

<main class="doc">
  <div class="wrap">
    <article class="card">
      <a class="back" href="../../">← 파랑버섯 스튜디오</a>
      {body}
    </article>
  </div>
</main>

<footer>
  <div class="wrap">
    <p>© 2026 Bluemushroom studio · 파랑버섯 스튜디오</p>
    <p><a href="../../">첫 화면</a></p>
  </div>
</footer>

</body>
</html>
"""


def main():
    title, body = convert(SRC.read_text(encoding="utf-8"))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(PAGE.format(title=html.escape(title), body=body), encoding="utf-8")
    print("wrote", OUT.relative_to(ROOT), "-", title)


if __name__ == "__main__":
    main()
