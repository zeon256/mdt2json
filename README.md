# mdtable2json
> mdtable2json is a TypeScript library and CLI tool that allows you to transpile tables in your markdown file to minified JSON. With mdtable2json, you can easily convert your markdown table data into a structured JSON format.

## Features
- Convert markdown tables to JSON
- Command-line interface (CLI) tool for easy conversion
- Multiple knobs available for customizing the conversion process. Don't need to minify? No problem! Prefer Array of Structures (AoS) over Structure of Arrays (SoA)? We got you covered!

## Installation (CLI)
```bash
npm install -g mdtable2json-cli
```

## Installation (Library)
```bash
npm install mdtable2json
```

## CLI Usage
```bash
Usage: mdtable2json-cli [options]

Options:
  -f, --file <file>         file to transpile
  -k, --out-file <outFile>  output file
  -d, --dir <dir>           directory of files to transpile
  -o, --out <out>           output directory
  -l, --layout <layout>     layout of json output (default: "SoA")
  -m, --minify              minify json output
  -h, --help                display help for command
```

## Library Usage
```typescript
import { MarkdownTable2Json, JsonLayout } from 'mdtable2json';

const markdownString = `your_markdown_string_here`;
const transpiler     = new MarkdownTable2Json({markdownString, layout: JsonLayout.AoS , minify: true });
console.log(transpiler.transform());
```