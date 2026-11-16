# 파랑버섯 스튜디오 웹사이트

파랑버섯 스튜디오(Bluemushroom studio)의 소개 사이트와 「아빠 전쟁」 개인정보 처리방침입니다.

- 사이트: https://mcuffs.github.io/bluemushroom/
- 처리방침: https://mcuffs.github.io/bluemushroom/dadwar/privacy/

정적 파일만 있고, 외부 글꼴·스크립트·추적 코드를 쓰지 않습니다. GitHub Pages가 `main` 브랜치의 `docs/` 폴더를 그대로 게시합니다.

## 구성

| 경로 | 내용 |
| --- | --- |
| `docs/` | 게시되는 폴더 (사이트의 최상위) |
| `docs/index.html` | 스튜디오 소개, 게임 소개, 문의, 영어 요약 |
| `docs/dadwar/privacy/index.html` | 아빠 전쟁 개인정보 처리방침 (자동 생성, 직접 고치지 않음) |
| `docs/assets/` | 스타일, 아이콘, 대표 그림, 게임 화면 |
| `content/dadwar-privacy.md` | 처리방침 원문 |
| `tools/build_privacy.py` | 원문을 처리방침 페이지로 바꾸는 스크립트 |

## 고치는 방법

소개 문구는 `docs/index.html`을 직접 고칩니다.

처리방침은 원문을 고친 뒤 스크립트로 페이지를 다시 만듭니다.

1. `content/dadwar-privacy.md`를 고칩니다. 게임 저장소의 `PrivacyPolicy.md`와 같은 내용으로 유지합니다.
2. `python3 tools/build_privacy.py`를 실행합니다.

고친 내용을 `main`에 올리면 1~2분 안에 사이트에 반영됩니다.

## 그림 출처

게임 저장소의 그림을 웹용 크기로 줄여 쓴 것입니다.

- 앱 아이콘: `Assets/DadSchoolBoss/Art/V5/app_icon.png`
- 대표 그림: `Assets/DadSchoolBoss/Art/V11Opening/title_keyart.png`에서 아빠 부분만 자른 것
- 게임 화면: `Design/dad-commercial-ui-v18/06-flight.png`
