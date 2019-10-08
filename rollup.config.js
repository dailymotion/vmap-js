import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import path from 'path';

const plugins = [
  babel({
    babelrc: false,
    presets: [['@babel/preset-env', { modules: false }]],
    exclude: ['node_modules/**'],
  }),
  uglify(),
];

export default [
  {
    input: 'src/index.js',
    output: {
      file: path.resolve(__dirname, 'dist', 'vmap-js-node.js'),
      format: 'cjs',
    },
    plugins,
  },
  {
    input: 'src/index.js',
    output: {
      file: path.resolve(__dirname, 'dist', 'vmap-js.js'),
      format: 'iife',
      name: 'VMAP',
    },
    plugins,
  },
];
