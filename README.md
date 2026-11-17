# 파랑버섯 스튜디오 웹사이트

사이트: https://mcuffs.github.io/bluemushroom/
개인정보 처리방침: https://mcuffs.github.io/bluemushroom/dadwar/privacy/

GitHub Pages가 `main` 브랜치의 `docs/`를 게시합니다. 2026-11-17부터 첫 화면은 React 19와 Meta의 Astryx 디자인 시스템(0.7.16) 부품으로 만들고, Vite로 빌드한 결과를 `docs/`에 넣습니다. 추적 코드와 외부 글꼴·스크립트 요청은 쓰지 않습니다.

**`docs/`는 빌드할 때마다 통째로 다시 만들어집니다. 직접 고치지 마세요.** 그대로 게시할 파일은 `public/`에 둡니다.

## 고치는 방법

처음 한 번 의존성을 설치합니다.

```bash
npm ci
```

고친 뒤에는 빌드해서 `docs/`를 갱신하고, 소스와 `docs/`를 함께 커밋합니다. `main`에 올리면 1~2분 안에 사이트에 반영됩니다. 빌드는 글꼴 파일도 그때의 문구에 맞춰 다시 만듭니다.

```bash
npm run build
```

| 고칠 것 | 위치 |
| --- | --- |
| 첫 화면의 문구와 구성 | `src/pages/Home.tsx` |
| 출시 예정 카드 | `src/pages/Home.tsx`의 `GAMES`. `content/games-lineup.json`과 같은 내용으로 유지 |
| 색, 글꼴, 글자 크기, 둥글기 | 테마. 아래 "테마" 참고 |
| 그림, 글꼴 파일, 그대로 게시할 파일 | `public/` |
| 머리말 태그(제목, 설명, 인증 태그), 스크립트 없이 볼 때의 안내 | `index.html` |
| 처리방침 | `content/dadwar-privacy.md`를 고치고 `python3 tools/build_privacy.py` 실행 후 빌드. 게임 저장소의 `PrivacyPolicy.md`, 앱 안 문구와 글자까지 같게 유지 |

### 부품 쓰는 규칙

Astryx의 작업 규칙은 `AGENTS.md`와 `.claude/CLAUDE.md`에 있습니다(Astryx가 관리하는 구역). 요점은 다음과 같습니다.

- 배치는 `VStack`, `HStack`, `Grid`, `Card` 같은 부품으로 하고 `<div>`와 직접 스타일을 쓰지 않습니다.
- 색과 크기는 부품 속성과 테마 값만 씁니다. 색상 코드나 px 값을 직접 적지 않습니다.
- 부품의 속성은 `npm run astryx -- component <이름>`으로 확인합니다.
- 고친 뒤 `npm run astryx -- doctor --built .`로 점검합니다. `src/astryx-themes.js`에 대한 경고 2건은 Astryx가 만든 파일이라 그대로 둡니다.

### 테마

테마 이름은 `family`입니다. 설정은 명령으로 바꿉니다.

```bash
npm run astryx -- experimental theme editor set family corners round
```

명령으로 안 되는 것은 `themes/family/family.theme.ts`에 직접 적습니다(한글 어절 단위 줄바꿈, 접기 제목의 누르는 높이가 여기에 있습니다). 이 파일을 고친 뒤에는 다시 빌드합니다.

```bash
npm run astryx -- experimental theme compile themes/family/family.theme.ts
```

테마를 다시 빌드하면 `src/themes/family/family.fonts.css`가 지워집니다. 아래 두 줄로 되돌린 뒤 `npm run build`를 실행합니다.

```bash
cp themes/family/family.fonts.css src/themes/family/family.fonts.css
```

```bash
npm run astryx -- theme add family
```

## 지켜야 할 것

- **Search Console 인증:** `index.html`의 `google-site-verification` 태그와 `public/google6c6a5495e3adbfbc.html`을 지우면 인증이 풀립니다. Google Play 조직 계정의 웹사이트 확인이 이 인증에 걸려 있습니다.
- **처리방침 주소:** `/dadwar/privacy/` 경로를 바꾸지 않습니다. 앱 안 링크가 이 주소를 씁니다.
- **자리 표시:** `#p1`~`#p6`, `#dadwar`를 유지합니다. 처리방침 페이지의 메뉴가 `#p3`, `#p5`로 들어옵니다.
- **문의 주소:** `contact@shuffla.io`.
- **출시 상태 표기:** 아빠 전쟁은 개발 중, 후속 다섯 작품은 출시 예정·기획 중으로 구분합니다. 정해지지 않은 출시일이나 스토어 링크를 넣지 않습니다.
- **글꼴:** 글꼴은 Pretendard 한 가지입니다(굵기 400~700). `tools/subset-fonts.mjs`가 원본(`content/fonts/PretendardVariable.woff2`)에서 사이트 문구에 쓰인 글자만 남겨 `public/assets/fonts/bluemushroom-sans.woff2`를 만들고, `npm run build`가 매번 먼저 실행합니다. Pretendard는 SIL OFL 1.1이고 'Pretendard'가 예약 이름이라, 글자를 덜어 낸 파일은 글꼴 안의 이름을 'Bluemushroom Sans'로 바꿔 배포합니다. 라이선스 고지(`public/assets/fonts/Pretendard-OFL.txt`)를 함께 게시합니다.

## 파일

| 경로 | 내용 |
| --- | --- |
| `index.html` | 빌드의 시작 페이지. 머리말 태그와 스크립트 없이 볼 때의 안내 |
| `src/main.tsx` | 시작점. 테마와 한국어 문구 묶음을 건다 |
| `src/pages/Home.tsx` | 첫 화면 (표지, 우리의 이야기, 출시 예정작, 아빠 전쟁, 플레이 방법, 문의, 영어 후기) |
| `themes/family/` | 테마 원본. `family.settings.json`은 테마 명령이 관리 |
| `src/themes/family/`, `src/astryx-themes.js` | 테마의 앱용 사본과 연결 파일. 자동 생성, 직접 고치지 않음 |
| `public/` | 그대로 게시되는 파일. 그림, 글꼴, 처리방침 페이지와 그 스타일(`assets/site.css`), 인증 파일, `.nojekyll` |
| `docs/` | 빌드 결과. GitHub Pages가 게시 |
| `content/` | 처리방침 원문, 디자인 기준, 작품 라인업과 제작 순서, 원화와 제작 기록 |
| `content/fonts/` | Pretendard 원본 글꼴과 라이선스 원문 (게시하지 않음) |
| `tools/subset-fonts.mjs` | 원본 글꼴에서 사이트 글자만 남긴 글꼴 파일을 만든다. 빌드가 자동 실행 |
| `tools/build_privacy.py` | 처리방침 원문을 `public/dadwar/privacy/index.html`로 변환 |
| `tools/capture.mjs` | 화면 없는 크롬으로 페이지 전체 캡처 (`node tools/capture.mjs <주소> <파일> <폭> <높이> [mobile]`) |
| `tools/build_hero_art.py` | 이전 만화풍 표지 그림용. 지금은 쓰지 않음 |

## 그림

메인의 가족 그림(`public/assets/game-family.webp`)은 「아빠 전쟁」의 아빠와 아들 원화를 바탕으로 구성한 창작 일러스트이며 실제 가족사진이 아닙니다. 왼쪽부터 아빠 칠석, 형 철수, 막내 만수, 엄마 수진입니다. 얼굴 썸네일 네 장(`face-*.webp`)은 이 그림에서 잘라 낸 것입니다. 디자인 기준과 확정 이름은 `content/design-guide.md`, 원화 제작 기록은 `content/game-family-art.md`와 `content/art-direction.md`에 있습니다.

## 확인한 것과 한계

- 화면 없는 크롬에서 폭 1280과 390으로 전체 화면을 캡처해 확인했습니다. 가로 넘침, 스크립트 오류, 불러오지 못한 그림은 없었습니다.
- 처리방침 페이지는 이전 게시본과 바이트 단위로 같습니다.
- 첫 화면은 스크립트가 있어야 보입니다. 스크립트가 꺼져 있으면 스튜디오 이름, 문의 주소, 처리방침 링크만 보입니다.
- 실제 휴대폰과 화면 낭독기에서는 확인하지 않았습니다.
- 로컬 QA 캡처는 `.qa/`에 둡니다(커밋하지 않음).
