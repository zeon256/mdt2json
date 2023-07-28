import { Command } from "commander";
import { JsonLayout, MarkdownTable2Json } from "mdtable2json/dist/lib.js";
import fs from "fs";

(() => {
	// use commander to parse args
	const program = new Command();
	// args for 1 file or a directory of files
	program
		.option("-f, --file <file>", "file to transpile")
		.option("-k, --out-file <outFile>", "output file")
		.option("-d, --dir <dir>", "directory of files to transpile")
		.option("-o, --out <out>", "output directory")
		.option("-l, --layout <layout>", "layout of json output", "SoA")
		.option("-m, --minify", "minify json output")
		.parse(process.argv);

	const opts = program.opts();

	// check if file or dir is provided
	if (!opts.file && !opts.dir) {
		console.error("[-] no file or directory provided");
		process.exit(1);
	}

	// check if out file or out dir is provided
	if (!opts.outFile && !opts.out) {
		console.error("[-] no out file or out directory provided");
		process.exit(1);
	}

	// check if layout is valid
	if (opts.layout !== "SoA" && opts.layout !== "AoS") {
		console.error("[-] invalid layout provided");
		process.exit(1);
	}

	// check if file or dir is provided
	if (opts.file && opts.dir) {
		console.error("[-] cannot provide both file and directory");
		process.exit(1);
	}
	// check if out file or out dir is provided
	if (opts.outFile && opts.out) {
		console.error("[-] cannot provide both out file and out directory");
		process.exit(1);
	}

	const layout = opts.layout === "SoA" ? JsonLayout.SoA : JsonLayout.AoS;
	const minify = opts.minify ? true : false;

	// check if file or dir is provided
	if (opts.file) {
		// check if out file or out dir is provided
		if (opts.outFile) {
			// transpile file to file
			const transpiler = new MarkdownTable2Json({
				markdownString: fs.readFileSync(opts.file, { encoding: "utf-8" }),
				layout,
				minify,
			});
			fs.writeFileSync(opts.outFile, transpiler.transform());
		}
	}

	// check if dir is provided
	if (opts.dir) {
		// check if out file or out dir is provided
		if (opts.out) {
			// read only markdown files
			const files = fs
				.readdirSync(opts.dir)
				.filter((file) => file.endsWith(".md"))
				.map((file) => {
					const markdownString = fs.readFileSync(`${opts.dir}/${file}`, { encoding: "utf-8" });
					const outFile = `json_${file}`;
					return {
						markdownString,
						outFile,
					};
				});

			// transpile file to file
			for (const { markdownString, outFile } of files) {
				const transpiler = new MarkdownTable2Json({
					markdownString,
					layout,
					minify,
				});
				fs.writeFileSync(`${opts.out}/${outFile}`, transpiler.transform());
			}
		}
	}
})();
