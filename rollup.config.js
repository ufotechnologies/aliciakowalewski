import resolve from '@rollup/plugin-node-resolve';
import { terser, timestamp } from 'rollup-plugin-bundleutils';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/js/main.js',
  output: {
    file: 'public/assets/js/app.js',
    format: 'es'
  },
  plugins: [
    resolve({
      browser: true
    }),
    production && terser({
      output: {
        preamble: `// ${timestamp()}`
      }
    })
  ],
  watch: {
    clearScreen: false
  }
};
