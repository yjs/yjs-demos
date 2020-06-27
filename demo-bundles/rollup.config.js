import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

const bundles = ['./yjs.js', 'yjs-quill.js', 'yjs-codemirror.js']

export default bundles.map(input => ({
  input,
  output: {
    dir: 'dist',
    format: 'iife',
    sourcemap: true,
    entryFileNames: '[name].js'
  },
  plugins: [
    nodeResolve({
      mainFields: ['module', 'browser', 'main']
    }),
    commonjs(),
    terser()
  ]
}))
