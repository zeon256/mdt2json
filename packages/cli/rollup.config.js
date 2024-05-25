import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
    input: 'src/mdt2json.ts',
    output: {
        file: '../../dist/cli/mdt2json.js', 
        format: 'cjs',
        banner: '#!/usr/bin/env node',
        sourcemap: false
    },
    plugins: [
        resolve({
            modulePaths: ['../../dist/lib/']
        }),
        commonjs({browser: false}),
        typescript({ tsconfig: './tsconfig.json' }),
		terser()
    ],
    external: [
        // Specify any external dependencies you don't want to include in your bundle
    ]
};
