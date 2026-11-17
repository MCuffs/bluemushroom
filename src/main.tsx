import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import '@astryxdesign/core/reset.css';
import '@astryxdesign/core/astryx.css';
import {Theme} from '@astryxdesign/core/theme';
import {InternationalizationProvider} from '@astryxdesign/core/i18n';
import koKR from '@astryxdesign/core/locales/ko-KR.generated.js';
import {themes, defaultThemeSlug} from './astryx-themes';
import Home from './pages/Home';

// 부품이 스스로 붙이는 이름(메뉴 열기, 본문으로 건너뛰기 등)을 한국어로 낸다.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InternationalizationProvider locale="ko-KR" messages={{'ko-KR': koKR}}>
      <Theme theme={themes[defaultThemeSlug]}>
        <Home />
      </Theme>
    </InternationalizationProvider>
  </StrictMode>,
);
