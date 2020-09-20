import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

import pkg from './package.json';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false
    }
  ],
  plugins: [
    typescript({jsx: 'react'}),
    json()
  ],
  external: ['react']
}
