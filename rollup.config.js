import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

const minificationPlugins = process.env.PRODUCTION ? [terser({
  module: true,
  compress: {
    hoist_vars: true,
    module: true,
    passes: 5,
    pure_getters: true,
    unsafe_comps: true,
    unsafe_undefined: true
  },
  mangle: {
    toplevel: true
  }
})] : []

export default [{
  input: './prosemirror/index.js',
  output: [{
    name: 'prosemirror',
    file: 'dist/prosemirror.js',
    format: 'iife',
    sourcemap: true,
    globals: {
      'crypto': 'null'
    }
  }],
  plugins: [
    nodeResolve({
      sourcemap: true,
      module: false,
      browser: true
    }),
    commonjs(),
    ...minificationPlugins
  ]
}]
