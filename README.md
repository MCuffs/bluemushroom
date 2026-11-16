# 파랑버섯 스튜디오 웹사이트

사이트: https://mcuffs.github.io/bluemushroom/
개인정보 처리방침: https://mcuffs.github.io/bluemushroom/dadwar/privacy/

GitHub Pages가 `main` 브랜치의 `docs/`를 게시합니다. 빌드가 필요 없는 HTML/CSS/JavaScript이며 추적 코드나 외부 글꼴 요청을 사용하지 않습니다.

## 2026-11-16 디자인

가족과의 기억을 오래 남기고 싶다는 창업자의 이야기를 중심으로, 낡은 일본 만화 단행본을 연상시키는 편집 디자인으로 개편했습니다. 먹색·종이색·파랑, 세로 한자, 장 구분, 자가 호스팅 명조/고딕 글꼴을 사용합니다. 기존 가로 페이지 넘기기를 세로 읽기로 바꾸고 `#p1`부터 `#p6`까지의 주소를 유지합니다.

사용자 피드백에 따라 원화의 얼굴·목·어깨를 더 가늘게, 인상을 더 부드럽게 수정했습니다. 특정 작품의 등장인물을 복사한 것이 아닌 창작 인물입니다. 원화 속 가족사진도 상징적인 창작 그림이며 실제 가족사진이 아닙니다.

- `docs/index.html`: 표지·시작 이야기·게임·플레이 방법·문의·영어 후기
- `docs/assets/manga.css`, `manga.js`: 반응형 디자인과 현재 장 표시
- `docs/assets/guardian-portrait-v2.webp`: 웹 최적화 원화(약550KB)
- `content/art/guardian-portrait-v2.png`: 원본 그림
- `content/art-direction.md`: 이미지 제작 프롬프트와 수정 방향
- `docs/assets/fonts/`: OFL 라이선스의 자가 호스팅 서브셋 글꼴 및 고지
- `docs/assets/site.css`: 기존 개인정보 처리방침 페이지용 스타일
- `content/dadwar-privacy.md`, `tools/build_privacy.py`: 처리방침 원문과 생성기. 디자인 개편에서 내용은 바꾸지 않았습니다.

문의 이메일은 실제 `mailto:` 링크이며 게임은 개발 중으로 표시합니다. 정식 출시나 스토어 승인 완료로 안내하지 않습니다. 테스트 버전 링크는 게임의 GitHub Releases로 연결됩니다.

## 검증

Chrome headless에서1440×1000,820×1180,390×844,320×740의 이미지·자가 호스팅 글꼴·단일h1·가로 넘침·메뉴 앵커 이동·개인정보 경로·JavaScript 오류 검사를 수행했습니다. 화면 캡처로 표지·게임·문의 배치를 확인했습니다. 실제 휴대폰 브라우저 및 모든 보조기술에서 검증한 것은 아닙니다. 로컬 QA 도구와 캡처는 `.qa/`에 두고 Git에서 제외합니다.

글꼴은 NanumMyeongjo ExtraBold와 Gothic A1을 페이지의 글자로 서브셋하고 이름을 BlueMushroomSerifSubset/BlueMushroomSansSubset으로 변경했습니다. 원본 저작권과 OFL 고지는 `docs/assets/fonts/`에 보존했습니다. 본문에 새 글자를 많이 추가할 때 글꼴 서브셋을 다시 생성하면 됩니다.
