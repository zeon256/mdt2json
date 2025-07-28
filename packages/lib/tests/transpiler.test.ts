import fs from "node:fs";
import { JsonLayout, MarkdownTable2Json } from "../src/mdt2json";

describe("transpiler", () => {
	describe("simple tables", () => {
		const inMd = fs.readFileSync("tests/sample/test1_in.md", { encoding: "utf-8" });
		const outAoS = fs.readFileSync("tests/sample/test1aos_out.md", { encoding: "utf-8" });
		const outSoA = fs.readFileSync("tests/sample/test1soa_out.md", { encoding: "utf-8" });

		it("simple tables aos", () => {
			const transpiler = new MarkdownTable2Json({
				markdownString: inMd,
				layout: JsonLayout.AoS,
				minify: true,
			});

			expect(transpiler.transform()).toBe(outAoS);
		});

		it("simple tables soa", () => {
			const transpilerSoA = new MarkdownTable2Json({
				markdownString: inMd,
				layout: JsonLayout.SoA,
				minify: true,
			});

			expect(transpilerSoA.transform()).toBe(outSoA);
		});
	});

	describe("include html", () => {
		const inMd = fs.readFileSync("tests/sample/test2_html_in.md", { encoding: "utf-8" });

		it("enabled", () => {
			const out = fs.readFileSync("tests/sample/test2_html_out_enabled.md", { encoding: "utf-8" });

			const transpiler = new MarkdownTable2Json({
				markdownString: inMd,
				minify: false,
				includeHtml: true,
			});

			expect(transpiler.transform()).toBe(out);
		});

		it("disabled", () => {
			const out = fs.readFileSync("tests/sample/test2_html_out_disabled.md", { encoding: "utf-8" });

			const transpiler = new MarkdownTable2Json({
				markdownString: inMd,
				minify: false,
				includeHtml: false,
			});

			expect(transpiler.transform()).toBe(out);
		});
	});
});
