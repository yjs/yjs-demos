import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

// If truthy, it expects all y-* dependencies in the upper directory.
// This is only necessary if you want to test and make changes to several repositories.
const localImports = process.env.LOCALIMPORTS

if (localImports) {
  console.info('Using local imports')
}

const customModules = new Set([
  'y-websocket',
  'y-codemirror',
  'y-ace',
  'y-textarea',
  'y-quill',
  'y-dom',
  'y-prosemirror',
  'y-monaco'
])
/**
 * @type {Set<any>}
 */
const customLibModules = new Set([
  'lib0',
  'y-protocols'
])

// @ts-ignore We use this for debugging
const debugResolve = {
  resolveId (importee) {
    if (localImports) {
      if (importee === 'yjs') {
        return `${process.cwd()}/../yjs/src/index.js`
      }
      if (customModules.has(importee.split('/')[0])) {
        return `${process.cwd()}/../${importee}/src/${importee}.js`
      }
      if (customLibModules.has(importee.split('/')[0])) {
        return `${process.cwd()}/../${importee}`
      }
    }
    return null
  }
}

const minificationPlugins = process.env.PRODUCTION ? [terser({
  module: true,
  compress: {
    hoist_vars: true,
    module: true,
    passes: 1,
    pure_getters: true,
    unsafe_comps: true,
    unsafe_undefined: true
  },
  mangle: {
    toplevel: true
  }
})] : []

const plugins = [
  debugResolve,
  nodeResolve({
    sourcemap: true,
    mainFields: ['module', 'browser', 'main']
  }),
  commonjs(),
  ...minificationPlugins
]

export default [{
  input: './prosemirror/index.js',
  output: {
    file: 'dist/prosemirror.js',
    format: 'iife',
    sourcemap: true,
    globals: {
      'crypto': 'null'
    }
  },
  plugins
}, {
  input: './prosemirror-versions/index.js',
  output: {
    file: 'dist/prosemirror-versions.js',
    format: 'iife',
    sourcemap: true,
    globals: {
      'crypto': 'null'
    }
  },
  plugins
}, {
  input: './quill/index.js',
  output: {
    file: 'dist/quill.js',
    format: 'iife',
    sourcemap: true
  },
  plugins
}]
