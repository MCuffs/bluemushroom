# 파랑버섯 스튜디오 웹사이트

사이트: https://mcuffs.github.io/bluemushroom/
개인정보 처리방침: https://mcuffs.github.io/bluemushroom/dadwar/privacy/

GitHub Pages가 `main` 브랜치의 `docs/`를 게시합니다. 빌드가 필요 없는 HTML/CSS/JavaScript이며 추적 코드나 외부 글꼴 요청을 사용하지 않습니다.

## 현재 디자인: 캐주얼 가족 게임 스튜디오

가족과의 기억을 오래 남기고 싶다는 이야기를 중심으로 아빠 칠석·엄마 수진·형 철수·막내 만수 네 식구가 서 있는 가족사진을 메인에 배치했습니다. 「아빠 전쟁」의 실제 아빠와 아들 원화를 참조해 가족 장면으로 재구성했으며 엄마와 형은 같은 게임 그림체로 맞췄습니다. 실제 가족사진이 아닌 창작 일러스트입니다. 사용자 피드백에 따라 엄마만 조금 더 날씬하게 수정했습니다.

굵은 게임 캐릭터와 게임의 타이틀 글꼴, 흰색 바탕, 둥근 카드·버튼과 밝은 강조색으로 웹과 게임을 연결합니다. 파랑버섯 로고와 가족 얼굴 썸네일을 사용합니다. 기존의 갸름한 단독 남성 원화와 수채화풍 가족은 메인에 쓰지 않습니다. 세로 읽기와 `#p1`부터 `#p6`까지의 주소를 유지합니다.

- `docs/index.html`: 가족 표지·시작 이야기·게임·플레이 방법·문의·영어 후기
- `docs/assets/manga.css`, `family.css`, `casual.css`, `manga.js`: 기본 레이아웃·가족 테마·캐주얼 디자인·현재 장 표시
- `content/games-lineup.json`: 여섯 작품의 제목·주인공·장르·시나리오·상태
- `content/games-roadmap.md`: 제작 순서·프로토타입 범위·가족 서사
- `docs/assets/game-family.webp`: 최종 웹용 가족 원화
- `content/art/game-family.png`: 원본 그림
- `content/game-family-art.md`: 게임 원화 참고와 제작/수정 프롬프트
- `content/design-guide.md`: 흰색 배경·메인 가족사진·확정 이름 등 디자인 기준
- `docs/assets/fonts/`: Gothic A1·Black Han Sans·NanumMyeongjo를 자가 호스팅하는 서브셋과 OFL 고지
- `docs/assets/site.css`: 개인정보 처리방침 페이지 스타일
- `content/dadwar-privacy.md`, `tools/build_privacy.py`: 처리방침 원문과 생성기

공식 이메일 `contact@shuffla.io`, Search Console 인증 메타와 파일, 개인정보 경로는 보존합니다. 아빠 전쟁은 개발 중, 후속 다섯 작품은 출시 예정·기획 중으로 구분합니다. 출시일 미정과 제작 순서 변경 가능성을 표시하고, 후속작의 이야기/플레이 구상을 펼쳐 볼 수 있습니다. 정식 출시나 스토어 승인 완료로 안내하지 않습니다.

Chrome headless에서1440×1000,820×1180,390×844,320×740의 이미지·글꼴·가로 넘침·메뉴 앵커·개인정보 경로·JavaScript 오류를 검사합니다. 캡처와 로컬 QA 도구는 `.qa/`에 둡니다. 실제 휴대폰 브라우저/모든 보조기술을 검증한 것은 아닙니다.

수정 전 단독 인물의 제작 이력은 `content/art-direction.md`에 보존합니다. 글꼴 본문에 새 글자를 추가할 때는 서브셋을 다시 생성하세요. 이름은 BlueMushroomSerifSubset/BlueMushroomSansSubset/BlueMushroomGameTitleSubset으로 변경했으며 원본 저작권과 OFL 고지는 함께 배포합니다.
