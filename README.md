# mdtable2json
> mdtable2json is a TypeScript library and CLI tool that allows you to transpile tables in your markdown file to minified JSON. With mdtable2json, you can easily convert your markdown table data into a structured JSON format.

## Features
- ESModule support
- Convert markdown tables to JSON
- Command-line interface (CLI) tool for easy conversion
- Multiple knobs available for customizing the conversion process. Don't need to minify? No problem! Prefer Array of Structures (AoS) over Structure of Arrays (SoA)? We got you covered!

## Installation (CLI and Library)
```bash
npm install -g mdt2json
```

## CLI Usage
```bash
Usage: mdt2json [options]

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
import { MarkdownTable2Json, JsonLayout } from 'mdt2json';

const markdownString = `your_markdown_string_here`;
const transpiler = new MarkdownTable2Json({markdownString, layout: JsonLayout.AoS , minify: true });
console.log(transpiler.transform());
```

## Use Cases
- Converting markdown tables to JSON for use in your web application
- Improve token efficiency of your markdown files for use in retrieval augmented generation (RAG) architecture with LLMs (Large Language Models) such as GPT-3

## Library Internals
This library works by parsing the markdown and getting the AST (Abstract Syntax Tree) of the markdown file. The AST is then traversed to find the tables in the markdown file. Once the tables are found, the tables are converted to JSON and returned.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project and documentation is licensed under the [MIT License](./LICENSE)