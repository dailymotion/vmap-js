import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import externalHelpers from 'babel-plugin-external-helpers';

export default {
    input: 'src/index.js',
    output: {
        file: 'bundle.js',
        format: 'iife',
        name: 'VMAP'
    },
    plugins: [
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
        }),
        uglify()
    ]
};
