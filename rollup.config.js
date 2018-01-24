import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import externalHelpers from 'babel-plugin-external-helpers';

const distFile = process.env.VMAP_BUILD === 'min' ? 'vmap-js.min.js' : 'vmap-js.js';
const plugins = [
    babel({
        babelrc: false,
        presets: [[
            "es2015",
            {
              "modules": false
            }]
        ],
        plugins: [ externalHelpers ],
        exclude: 'node_modules/**'
    })
];

if (process.env.VMAP_BUILD === 'min') {
    plugins.push(uglify());
}

export default {
    input: 'src/index.js',
    output: {
        file: distFile,
        format: 'cjs',
        name: 'VMAP'
    },
    plugins: plugins
};
