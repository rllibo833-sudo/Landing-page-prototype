import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'node:path';
export default defineConfig({
  base:'/kawasan-masjid-public/',
  plugins:[react()],
  build:{rollupOptions:{input:{
    main:resolve(__dirname,'index.html'),
    digitalIslam:resolve(__dirname,'belajar-islam-digital.html'),
    vision:resolve(__dirname,'vision.html'),
    ecosystem:resolve(__dirname,'ecosystem.html'),
    system:resolve(__dirname,'system.html'),
    research:resolve(__dirname,'research.html'),
    collaborate:resolve(__dirname,'collaborate.html'),
    about:resolve(__dirname,'about.html'),
    support:resolve(__dirname,'support.html')
  }}}
});
