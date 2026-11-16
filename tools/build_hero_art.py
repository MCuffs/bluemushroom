#!/usr/bin/env python3
"""만화풍 주인공 그림(docs/assets/hero-manga.svg)을 만든다.

90년대 일본 격투·불량 만화 계열의 그림체를 참고한 창작 인물이다.
(뒤로 넘긴 머리, 가늘고 날카로운 눈, 굵은 눈썹, 한쪽 입꼬리를 올린 표정, 사선 음영)
특정 작품의 인물을 따라 그리지 않는다. 교복을 입히지 않고 성인으로 그린다.

사용: python3 tools/build_hero_art.py
"""
import math
import pathlib
import random

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "docs" / "assets" / "hero-manga.svg"
W, H = 640, 720
INK = "#111114"
BLUE = "#1b74ff"
rnd = random.Random(11)


def pts(points):
    return " ".join("%.1f,%.1f" % (x, y) for x, y in points)


def mirror(points, cx=300):
    return [(2 * cx - x, y) for x, y in points]


def poly(points, **attrs):
    extra = " ".join('%s="%s"' % (k.replace("_", "-"), v) for k, v in attrs.items())
    return '<polygon points="%s" %s/>' % (pts(points), extra)


def focus_lines(cx, cy, count=120):
    """집중선: 바깥에서 얼굴 쪽으로 모이는 검은 쐐기."""
    out = []
    step = 360.0 / count
    for i in range(count):
        ang = math.radians(i * step + rnd.uniform(-step * 0.35, step * 0.35))
        width = math.radians(rnd.uniform(0.45, 2.3))
        inner = rnd.uniform(250, 380)
        outer = 1100
        tip = (cx + inner * math.cos(ang), cy + inner * math.sin(ang))
        a = (cx + outer * math.cos(ang - width / 2), cy + outer * math.sin(ang - width / 2))
        b = (cx + outer * math.cos(ang + width / 2), cy + outer * math.sin(ang + width / 2))
        out.append(poly([tip, a, b]))
    return "\n    ".join(out)


# ---------- 머리카락: 뒤로 넘긴 머리 ----------
HAIR_PATH = ("M206,338 L198,300 Q184,244 198,204 Q222,146 300,124 L336,120 L366,104 L356,130 "
             "L400,120 L382,146 L428,152 L402,172 L440,194 L412,208 L424,250 L408,244 L410,282 "
             "L402,302 L396,338 L390,304 L386,276 Q378,256 340,242 L320,244 L300,252 L280,244 "
             "L260,242 Q224,254 216,276 L212,304 Z")
# 이마로 흘러내린 가닥
HAIR_STRANDS = [
    [(290, 246), (280, 272), (285, 294), (290, 270), (299, 252)],
    [(309, 246), (321, 268), (318, 288), (314, 268), (303, 252)],
]
# 윤기: 빗어 넘긴 방향을 따라가는 가는 흰 선
HAIR_STREAKS = ("M226,254 Q208,224 214,196 M242,246 Q226,214 236,180 M260,242 Q248,206 262,166 "
                "M280,244 Q274,204 292,150 M300,250 Q300,204 322,142 M322,244 Q330,202 352,144 "
                "M342,242 Q356,208 380,160 M362,250 Q380,222 402,186 M378,262 Q394,240 412,222")
HAIR_STREAKS_FINE = ("M234,250 Q218,222 224,192 M251,244 Q238,212 250,176 M270,243 Q262,206 278,160 "
                     "M290,247 Q288,206 308,148 M311,246 Q316,204 338,146 M332,243 Q344,206 366,154 "
                     "M352,246 Q368,216 392,174")

# ---------- 얼굴 (턱을 길고 각지게: 성인으로 보이도록) ----------
FACE = ("M212,262 C205,290 205,322 212,350 L230,406 Q252,440 276,454 Q300,468 324,454 "
        "Q348,440 370,406 L388,350 C395,322 395,290 388,262 C378,196 222,196 212,262 Z")
FACE_SHADOW = ("M364,246 L388,262 C395,290 395,322 388,350 L370,406 Q348,440 324,454 "
               "L336,418 Q368,384 360,330 Q354,290 364,246 Z")
BROW_L = [(212, 303), (244, 293), (290, 311), (297, 331), (262, 320), (224, 312)]
EYE_L_LID = [(222, 333), (250, 325), (283, 331), (296, 342), (281, 340), (250, 334), (232, 340)]


def eye(side):
    """side = 'L' 은 보는 사람 기준 왼쪽 눈. 가늘고 날카롭게."""
    m = (lambda p: p) if side == "L" else mirror
    sign = 1 if side == "L" else -1
    cx = 300 - sign * 35
    sx = cx - 3
    lower = "M240,352 Q262,356 287,349" if side == "L" else "M360,352 Q338,356 313,349"
    crease = "M240,362 Q260,366 282,360" if side == "L" else "M360,362 Q340,366 318,360"
    tick_a = m([(222, 333)])[0]
    tick_b = m([(211, 326)])[0]
    return """
      <path d="{lower}" fill="none" stroke="{ink}" stroke-width="2.6" stroke-linecap="round"/>
      <circle cx="{cx}" cy="343" r="8.6" fill="{ink}"/>
      <circle cx="{sx}" cy="341" r="2.3" fill="#fff"/>
      {lid}
      <line x1="{ax:.1f}" y1="{ay:.1f}" x2="{bx:.1f}" y2="{by:.1f}" stroke="{ink}" stroke-width="3.4" stroke-linecap="round"/>
    """.format(lower=lower, crease=crease, ink=INK, cx=cx, sx=sx, lid=poly(m(EYE_L_LID), fill=INK),
               ax=tick_a[0], ay=tick_a[1], bx=tick_b[0], by=tick_b[1])


def mushroom(x, y, s):
    return """
    <g transform="translate({x} {y}) scale({s})">
      <path d="M18 27h12l2 13a3 3 0 0 1-3 3.400H19A3 3 0 0 1 16 40z" fill="#fff" stroke="{ink}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M4 25C4 13 13 5 24 5s20 8 20 20c0 2.600-2 4-4.400 4H8.400C6 29 4 27.600 4 25z" fill="{blue}" stroke="{ink}" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="16" cy="17" r="3.600" fill="#fff"/><circle cx="29" cy="13" r="2.600" fill="#fff"/><circle cx="33" cy="22" r="3" fill="#fff"/>
    </g>""".format(x=x, y=y, s=s, ink=INK, blue=BLUE)


def build():
    frame = [(5, 5), (635, 5), (570, 715), (5, 715)]
    wraps = "".join(
        '<line x1="-62" y1="%d" x2="66" y2="%d" stroke="%s" stroke-width="3.2"/>' % (96 + i * 20, 84 + i * 20, INK)
        for i in range(4)
    )
    ribs_l = "".join(
        '<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="%s" stroke-width="2.4"/>'
        % (246 - i * 5.2, 456 + i * 13.5, 268 - i * 1.2, 470 + i * 15, INK) for i in range(1, 6)
    )
    ribs_r = "".join(
        '<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" stroke="%s" stroke-width="2.4"/>'
        % (354 + i * 5.2, 456 + i * 13.5, 332 + i * 1.2, 470 + i * 15, INK) for i in range(1, 6)
    )
    return """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-label="주먹을 쥔 만화풍 주인공">
  <defs>
    <clipPath id="frame"><polygon points="{frame}"/></clipPath>
    <pattern id="dots" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <circle cx="3.5" cy="3.5" r="1.55" fill="{ink}"/>
    </pattern>
    <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-40)">
      <line x1="0" y1="3" x2="6" y2="3" stroke="{ink}" stroke-width="1.5"/>
    </pattern>
  </defs>

  <g clip-path="url(#frame)">
    <rect width="{w}" height="{h}" fill="#fff"/>
    <g fill="{ink}">
    {focus}
    </g>
    <polygon points="0,560 250,720 0,720" fill="url(#dots)"/>

    <!-- 몸통 -->
    <polygon points="250,486 350,486 404,720 196,720" fill="#fff" stroke="{ink}" stroke-width="4"/>
    <path d="M254,492 Q300,536 346,492" fill="none" stroke="{ink}" stroke-width="4"/>
    <path d="M258,500 Q300,546 342,500" fill="none" stroke="{ink}" stroke-width="2"/>
    <path d="M268,566 L282,720 M330,572 L322,720" fill="none" stroke="{ink}" stroke-width="2" opacity=".55"/>
    <path d="M276,600 q24,10 48,0" fill="none" stroke="{ink}" stroke-width="2" opacity=".55"/>
    <polygon points="248,468 150,502 58,556 14,720 226,720 262,562" fill="{ink}"/>
    <polygon points="352,468 450,502 542,556 586,720 374,720 338,562" fill="{ink}"/>
    <path d="M150,512 Q104,536 72,580 M176,520 Q150,560 138,620 M92,600 Q70,650 62,712" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M450,512 Q496,536 528,580 M424,520 Q450,560 462,620" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M262,562 L228,720 M338,562 L372,720" fill="none" stroke="#fff" stroke-width="2.4"/>
    <!-- 깃 -->
    <polygon points="246,450 216,524 262,562 272,500" fill="#fff" stroke="{ink}" stroke-width="4" stroke-linejoin="round"/>
    <polygon points="354,450 384,524 338,562 328,500" fill="#fff" stroke="{ink}" stroke-width="4" stroke-linejoin="round"/>
    {ribs_l}{ribs_r}
    {pin}

    <!-- 목 -->
    <polygon points="254,424 248,500 352,500 346,424" fill="#fff" stroke="{ink}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M256,452 Q300,500 344,452 L346,486 Q300,506 254,486 Z" fill="url(#hatch)"/>
    <path d="M268,470 L277,499 M332,470 L323,499" stroke="{ink}" stroke-width="2.6" stroke-linecap="round"/>

    <!-- 머리 -->
    <g transform="rotate(-4 300 440)">
      <path d="M210,298 q-17,-7 -20,14 q0,26 22,34 z" fill="#fff" stroke="{ink}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M390,298 q17,-7 20,14 q0,26 -22,34 z" fill="#fff" stroke="{ink}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M200,314 q8,6 8,18 M400,314 q-8,6 -8,18" fill="none" stroke="{ink}" stroke-width="2.2" stroke-linecap="round"/>
      <path d="{face}" fill="#fff" stroke="{ink}" stroke-width="4.5" stroke-linejoin="round"/>
      <path d="{face_shadow}" fill="url(#hatch)"/>
      <path d="M220,372 q8,14 5,32" fill="none" stroke="{ink}" stroke-width="2.2" stroke-linecap="round"/>

      {brow_l}
      {brow_r}
      <line x1="336" y1="301" x2="346" y2="328" stroke="#fff" stroke-width="4.5"/>
      {eye_l}
      {eye_r}

      <path d="M300,344 L291,396 Q296,403 307,400" fill="none" stroke="{ink}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M313,400 q7,-2 8,-9" fill="none" stroke="{ink}" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M306,358 l9,-5 M306,368 l10,-5 M306,378 l10,-5 M307,388 l9,-5" stroke="{ink}" stroke-width="1.6" stroke-linecap="round"/>

      <path d="M266,427 Q298,435 326,425 Q338,420 347,408" fill="none" stroke="{ink}" stroke-width="4.2" stroke-linecap="round"/>
      <path d="M266,427 l-7,-2" stroke="{ink}" stroke-width="3" stroke-linecap="round"/>
      <path d="M288,442 q13,5 27,-1" fill="none" stroke="{ink}" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M351,404 q6,8 2,18" fill="none" stroke="{ink}" stroke-width="2.2" stroke-linecap="round"/>

      <g transform="rotate(-20 238 380)">
        <rect x="216" y="370" width="44" height="19" rx="6" fill="#fff" stroke="{ink}" stroke-width="3"/>
        <line x1="231" y1="370" x2="231" y2="389" stroke="{ink}" stroke-width="2"/>
        <line x1="245" y1="370" x2="245" y2="389" stroke="{ink}" stroke-width="2"/>
      </g>

      <path d="{hair}" fill="{ink}" stroke="{ink}" stroke-width="3" stroke-linejoin="miter"/>
      <g fill="{ink}">{strands}</g>
      <path d="{streaks}" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>
      <path d="{streaks_fine}" fill="none" stroke="#fff" stroke-width="1.3" stroke-linecap="round"/>
    </g>

    <!-- 주먹 -->
    <g transform="translate(462 566) rotate(-9)">
      <g fill="{ink}">
        <polygon points="0,-150 4,-96 -6,-96"/>
        <polygon points="96,-128 66,-84 58,-90"/>
      </g>
      <polygon points="-58,150 82,140 150,300 -40,300" fill="{ink}"/>
      <polygon points="-62,138 80,126 86,158 -58,170" fill="#fff" stroke="{ink}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M-40,142 l2,26 M-18,140 l2,26 M4,138 l2,26 M26,136 l2,26 M48,134 l2,26 M68,132 l2,26" stroke="{ink}" stroke-width="2.2"/>
      <polygon points="-60,66 58,66 78,132 -58,144" fill="#fff" stroke="{ink}" stroke-width="5" stroke-linejoin="round"/>
      {wraps}
      <path d="M-86,-30 Q-86,-62 -62,-65 Q-44,-80 -24,-67 Q-4,-84 18,-69 Q40,-84 60,-65 Q88,-60 87,-28 L84,40 Q80,72 40,74 L-50,74 Q-84,72 -87,36 Z" fill="#fff" stroke="{ink}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M-42,-66 L-40,-8 M-3,-70 L-2,-6 M40,-68 L40,-8" fill="none" stroke="{ink}" stroke-width="4" stroke-linecap="round"/>
      <path d="M-82,-6 Q0,8 84,-8" fill="none" stroke="{ink}" stroke-width="4" stroke-linecap="round"/>
      <path d="M-66,-46 q6,-8 14,-4 M-26,-50 q7,-8 15,-3 M16,-51 q7,-8 15,-3 M56,-46 q7,-7 14,-1" fill="none" stroke="{ink}" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M-90,12 Q-62,-6 -22,8 Q8,20 30,13 Q50,10 48,30 Q44,48 10,48 Q-40,52 -88,44 Z" fill="#fff" stroke="{ink}" stroke-width="5.5" stroke-linejoin="round"/>
      <path d="M-58,26 q14,-6 30,-2" fill="none" stroke="{ink}" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M22,17 Q42,15 42,29 Q40,39 24,40" fill="none" stroke="{ink}" stroke-width="2.6" stroke-linecap="round"/>
      <path d="M60,6 L84,2 L82,44 L62,56 Z" fill="url(#hatch)"/>
    </g>
  </g>
  <polygon points="{frame}" fill="none" stroke="{ink}" stroke-width="9" stroke-linejoin="miter"/>
</svg>
""".format(
        w=W, h=H, ink=INK, frame=pts(frame), focus=focus_lines(296, 312),
        ribs_l=ribs_l, ribs_r=ribs_r, pin=mushroom(120, 606, 1.25),
        face=FACE, face_shadow=FACE_SHADOW,
        brow_l=poly(BROW_L, fill=INK), brow_r=poly(mirror(BROW_L), fill=INK),
        eye_l=eye("L"), eye_r=eye("R"),
        hair=HAIR_PATH, strands="".join(poly(p) for p in HAIR_STRANDS),
        streaks=HAIR_STREAKS, streaks_fine=HAIR_STREAKS_FINE, wraps=wraps,
    )


def main():
    OUT.write_text(build(), encoding="utf-8")
    print("wrote", OUT.relative_to(ROOT), OUT.stat().st_size, "bytes")


if __name__ == "__main__":
    main()
