import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages가 main 브랜치의 docs/ 를 게시한다. docs/ 는 빌드할 때마다 통째로 다시 만들어지므로
// 직접 고치지 않는다. 그대로 게시할 파일(처리방침, 인증 파일, 그림, 글꼴)은 public/ 에 둔다.
// 주소가 /bluemushroom/ 아래라서 상대 경로로 빌드한다.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {outDir: 'docs', emptyOutDir: true},
  server: {port: 4320, strictPort: true},
  preview: {port: 4320, strictPort: true},
});
