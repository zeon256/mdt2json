import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
    input: "src/mdt2json.ts",
    output: [
      {
        file: "../../dist/lib/mdt2json.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "../../dist/lib/mdt2json.mjs",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
  };
