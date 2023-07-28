import fs from "fs";
import { JsonLayout, MarkdownTable2Json } from "../src/lib";

describe("transpiler", () => {
	// generate array of numbers from 1 to 1
	const files = Array.from(Array(1).keys()).map((x) => {
		const inMd = fs.readFileSync(`tests/sample/test${x + 1}_in.md`, { encoding: "utf-8" });
		const outAoS = fs.readFileSync(`tests/sample/test${x + 1}aos_out.md`, { encoding: "utf-8" });
		const outSoA = fs.readFileSync(`tests/sample/test${x + 1}soa_out.md`, { encoding: "utf-8" });

		return {
			inMd,
			outAoS,
			outSoA,
		};
	});

	it("simple tables aos", () => {
		for (const { inMd, outAoS } of files) {
			const transpiler = new MarkdownTable2Json({
				markdownString: inMd,
				layout: JsonLayout.AoS,
				minify: true,
			});

			expect(transpiler.transform()).toBe(outAoS);
		}
	});

	it("simple tables soa", () => {
		for(const {inMd, outSoA} of files) {
			const transpilerSoA = new MarkdownTable2Json({
				markdownString: inMd,
				layout: JsonLayout.SoA,
				minify: true,
			});

			expect(transpilerSoA.transform()).toBe(outSoA);
		}		
	});
});
