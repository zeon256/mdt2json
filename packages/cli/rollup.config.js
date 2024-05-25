// packages/cli/rollup.config.js
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
    input: 'src/mdt2json.ts',
    output: {
        file: '../../dist/cli/mdt2json.js',  // Adjust the output path to match your cleanBuild script
        format: 'cjs',
        banner: '#!/usr/bin/env node',
        sourcemap: true
    },
    plugins: [
        resolve({
            modulePaths: ['../lib/src']
        }),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json' }),
		terser()
    ],
    external: [
        // Specify any external dependencies you don't want to include in your bundle
    ]
};
