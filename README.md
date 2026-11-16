# 파랑버섯 스튜디오 웹사이트

사이트: https://mcuffs.github.io/bluemushroom/
개인정보 처리방침: https://mcuffs.github.io/bluemushroom/dadwar/privacy/

GitHub Pages가 `main` 브랜치의 `docs/`를 게시합니다. 빌드가 필요 없는 HTML/CSS/JavaScript이며 추적 코드나 외부 글꼴 요청을 사용하지 않습니다.

## 현재 디자인: 게임 캐릭터의 가족 앨범

가족과의 기억을 오래 남기고 싶다는 이야기를 중심으로 아빠·엄마·형·동생 네 식구가 서 있는 가족사진을 메인에 배치했습니다. 「아빠 전쟁」의 실제 아빠와 아들 원화를 참조해 가족 장면으로 재구성했으며 엄마와 형은 같은 게임 그림체로 맞췄습니다. 실제 가족사진이 아닌 창작 일러스트입니다. 사용자 피드백에 따라 엄마만 조금 더 날씬하게 수정했습니다.

굵은 게임 캐릭터 윤곽선과 게임의 타이틀 글꼴, 크림·올리브·노랑을 사용해 웹과 게임의 분위기를 연결했습니다. 기존의 갸름한 단독 남성 원화와 수채화풍 가족은 메인에 쓰지 않습니다. 세로 읽기와 `#p1`부터 `#p6`까지의 주소를 유지합니다.

- `docs/index.html`: 가족 표지·시작 이야기·게임·플레이 방법·문의·영어 후기
- `docs/assets/manga.css`, `family.css`, `manga.js`: 기본 레이아웃·가족 앨범 테마·현재 장 표시
- `docs/assets/game-family.webp`: 최종 웹용 가족 원화
- `content/art/game-family.png`: 원본 그림
- `content/game-family-art.md`: 게임 원화 참고와 제작/수정 프롬프트
- `docs/assets/fonts/`: Gothic A1·Black Han Sans·NanumMyeongjo를 자가 호스팅하는 서브셋과 OFL 고지
- `docs/assets/site.css`: 개인정보 처리방침 페이지 스타일
- `content/dadwar-privacy.md`, `tools/build_privacy.py`: 처리방침 원문과 생성기

공식 이메일 `contact@shuffla.io`, Search Console 인증 메타와 파일, 개인정보 경로는 보존합니다. 게임은 개발 중으로 표시하며 정식 출시나 스토어 승인 완료로 안내하지 않습니다.

Chrome headless에서1440×1000,820×1180,390×844,320×740의 이미지·글꼴·가로 넘침·메뉴 앵커·개인정보 경로·JavaScript 오류를 검사합니다. 캡처와 로컬 QA 도구는 `.qa/`에 둡니다. 실제 휴대폰 브라우저/모든 보조기술을 검증한 것은 아닙니다.

수정 전 단독 인물의 제작 이력은 `content/art-direction.md`에 보존합니다. 글꼴 본문에 새 글자를 추가할 때는 서브셋을 다시 생성하세요. 이름은 BlueMushroomSerifSubset/BlueMushroomSansSubset/BlueMushroomGameTitleSubset으로 변경했으며 원본 저작권과 OFL 고지는 함께 배포합니다.
