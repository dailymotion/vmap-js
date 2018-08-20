import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import externalHelpers from 'babel-plugin-external-helpers';
import path from 'path';

const plugins = [
  babel({
    babelrc: false,
    presets: [
      [
        'es2015',
        {
          modules: false,
        },
      ],
    ],
    plugins: [externalHelpers],
    exclude: 'node_modules/**',
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
