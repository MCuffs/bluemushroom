# 파랑버섯 스튜디오 웹사이트

파랑버섯 스튜디오(Bluemushroom studio)의 소개 사이트와 「아빠 전쟁」 개인정보 처리방침입니다.

- 사이트: https://mcuffs.github.io/bluemushroom/
- 처리방침: https://mcuffs.github.io/bluemushroom/dadwar/privacy/

정적 파일만 있고, 외부 글꼴·스크립트·추적 코드를 쓰지 않습니다. GitHub Pages가 `main` 브랜치의 `docs/` 폴더를 그대로 게시합니다.

## 화면 구성

흑백 만화책처럼 한 쪽씩 넘겨 읽습니다. 모두 6쪽입니다.

| 쪽 | 주소 | 내용 |
| --- | --- | --- |
| 1 | `#p1` | 표지 (주인공 그림, 스튜디오 이름, 띠지 문구) |
| 2 | `#p2` | 스튜디오 소개 |
| 3 | `#p3` | 제1화 아빠 전쟁 (이야기) |
| 4 | `#p4` | 게임 소개 (특징 3가지, 게임 화면) |
| 5 | `#p5` | 스튜디오 정보와 문의 |
| 6 | `#p6` | 영어 요약 |

넘기는 방법: 아래 막대의 화살표와 번호, 키보드 좌우 화살표, 마우스 휠, 화면 밀기. 스크립트가 꺼져 있어도 번호 링크와 화면 밀기로 읽을 수 있습니다.

## 파일

| 경로 | 내용 |
| --- | --- |
| `docs/index.html` | 6쪽 본문과 쪽 넘김 스크립트 |
| `docs/assets/site.css` | 스타일 (만화 컷, 말풍선, 효과음 글자, 쪽 넘김) |
| `docs/assets/hero-manga.svg` | 주인공 그림 (자동 생성, 직접 고치지 않음) |
| `docs/dadwar/privacy/index.html` | 아빠 전쟁 개인정보 처리방침 (자동 생성, 직접 고치지 않음) |
| `content/dadwar-privacy.md` | 처리방침 원문 |
| `tools/build_hero_art.py` | 주인공 그림을 만드는 스크립트 |
| `tools/build_privacy.py` | 원문을 처리방침 페이지로 바꾸는 스크립트 |

## 고치는 방법

- 소개 문구: `docs/index.html`을 직접 고칩니다.
- 주인공 그림: `tools/build_hero_art.py`의 좌표를 고친 뒤 `python3 tools/build_hero_art.py`를 실행합니다. 표지와 2쪽의 확대 컷(눈매, 주먹)이 같은 그림 한 장을 씁니다.
- 주인공 그림을 다른 그림으로 바꿀 때: 가로 8 : 세로 9 비율의 그림을 `docs/assets/hero-manga.svg` 자리에 넣고, 2쪽 확대 컷의 위치(`site.css`의 `.eyes`, `.fist`)를 맞춥니다.
- 처리방침: `content/dadwar-privacy.md`를 고친 뒤 `python3 tools/build_privacy.py`를 실행합니다. 게임 저장소의 `PrivacyPolicy.md`와 같은 내용으로 유지합니다.

고친 내용을 `main`에 올리면 1~2분 안에 사이트에 반영됩니다.

## 그림

- 주인공: 90년대 일본 격투 만화 계열의 그림체를 참고해 코드로 그린 창작 인물입니다. 특정 작품의 인물을 옮긴 것이 아니며, 교복을 입히지 않고 성인으로 그렸습니다.
- 앱 아이콘, 달리는 아빠, 게임 화면: 게임 저장소의 그림을 웹용 크기로 줄여 쓴 것입니다 (`Assets/DadSchoolBoss/Art/V5/app_icon.png`, `Art/V11Opening/title_keyart.png`에서 아빠 부분만 자른 것, `Design/dad-commercial-ui-v18/06-flight.png`).
