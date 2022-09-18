import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-terser";
import dts from "rollup-plugin-dts";
import del from "rollup-plugin-delete";
const buildConfig = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/punctuate.common.js',
      format: 'cjs',
    },
    {
      file: 'dist/punctuate.common.min.js',
      format: 'cjs',
      plugins: [
        terser({
          compress: {
            drop_console: true,
            toplevel: true
          }
        })
      ]
    },
    {
      file: 'dist/punctuate.esm.js',
      format: 'es'
    },
    {
      file: 'dist/punctuate.js',
      format: 'umd',
      name: 'PunctuateReplace'
    },
    {
      file: 'dist/punctuate.min.js',
      format: 'umd',
      name: 'PunctuateReplace',
      plugins: [
        terser({
          compress: {
            drop_console: true,
            toplevel: true
          }
        })
      ]
    }
  ],
  plugins: [
    typescript(),
    babel({ babelHelpers: 'bundled' }),
  ]
}

/**
 * transform multi DTS file to a single
 * https://github.com/rollup/plugins/issues/394
 */
const typeFilesToSingleConfig = {
  input: 'dist/index.d.ts',
  output: {
    file: 'dist/index.d.ts'
  },
  plugins: [
    dts(),
    del({ targets: 'dist/*.d.ts', hook: 'buildEnd' })
  ]
}

export default [
  buildConfig,
  typeFilesToSingleConfig
];
