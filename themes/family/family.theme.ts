// The family theme. `astryx experimental theme editor` wrote this file once and never changes it again.
// The checked settings live in family.settings.json and the generated family.settings.ts;
// change them with `astryx experimental theme editor set family ...`. Add your own changes below: they win over the settings.
import {defineTheme} from '@astryxdesign/core/theme';
import {familySettings} from './family.settings';

export const familyTheme = defineTheme({
  extends: familySettings,
  name: 'family',
  // 한글은 단어(어절) 중간에서 줄이 바뀌면 읽기 어렵다. 글자 부품 전체에 어절 단위 줄바꿈을 건다.
  components: {
    text: {base: {wordBreak: 'keep-all'}},
    heading: {base: {wordBreak: 'keep-all'}},
    // 카드의 접기 제목은 글자 높이만큼만 눌려서 휴대폰에서 누르기 어렵다. 누르는 높이를 넉넉히 준다.
    'collapsible-trigger': {base: {minHeight: '2.75rem'}},
  },
});
