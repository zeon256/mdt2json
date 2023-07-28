import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { Processor, unified } from "unified";
import { Node } from "unist";
import { inspect } from "util";
import { Text, InlineCode, Table } from "mdast";

export interface RemarkNode extends Node {
	children?: Array<RemarkNode>;
	visited: boolean;
}

export enum JsonLayout {
	AoS = 0,
	SoA = 1,
}

export type TranspilerOpts = {
	markdownString: string;
	minify?: boolean;
	layout?: JsonLayout;
};

export class MarkdownTable2Json {
	private readonly buffer: Readonly<string>;
	private readonly layout: JsonLayout;
	private readonly minify: boolean;
	private readonly frozenProccesor: Processor<void, void, void, void>;
	private readonly ast: RemarkNode;

	public constructor({ markdownString, layout, minify }: TranspilerOpts) {
		this.buffer = markdownString;
		this.layout = layout ?? JsonLayout.SoA;
		this.minify = minify ?? true;
		this.frozenProccesor = unified().use(remarkParse).use(remarkGfm).use(remarkStringify);
		this.ast = this.frozenProccesor.parse(this.buffer) as RemarkNode;
	}

	public transform(): string {
		this.dfs(this.ast, (node) => {
			if (this.layout === JsonLayout.AoS) this.processTableAoS(node);
			if (this.layout === JsonLayout.SoA) this.processTableSoA(node);
		});

		return this.toMarkdownString(this.ast);
	}

	public prettyAst() {
		return inspect(this.ast);
	}

	private toMarkdownString(node: RemarkNode): string {
		return this.frozenProccesor.stringify(node) as string;
	}

	private cellToString(node: RemarkNode): string {
		let buffer = "";

		this.dfs(node, (n) => {
			if (n.type === "text") buffer += (n as unknown as Text).value;
			if (n.type === "inlineCode") buffer += `\`${(n as unknown as InlineCode).value}\``;
		});

		return buffer;
	}

	private processTableAoS(node: RemarkNode) {
		if (node.type !== "table") return;

		const table = node as Table;

		// check if there is at least 1 row
		if (table.children.length < 1) return;

		const headers = table.children[0].children.map((header) => this.cellToString(header as RemarkNode));

        // prepare json
		const json = [];

		for (const row of table.children.slice(1)) {
			const cells = row.children.map((cell) => this.cellToString(cell as RemarkNode));
            const obj = {};

            for (let i = 0; i < headers.length; i++) {
                // @ts-ignore
                obj[headers[i]] = cells[i];
            }

            json.push(obj);
		}

        const jsonNode = {
            type: "code",
            lang: "json",
            visited: true,
            value: JSON.stringify(json, null, this.minify ? 0 : 4)
        } as RemarkNode;

        Object.assign(node, jsonNode);
	}

	private processTableSoA(node: RemarkNode) {
		if (node.type !== "table") return;

		const table = node as Table;
        
		// check if there is at least 1 row
		if (table.children.length < 1) return;

        const headers = table.children[0].children.map((header) => this.cellToString(header as RemarkNode));
        
        // prepare json and fill with empty arrays
        const json = {};

        for(const row of table.children.slice(1)) {
            const cells = row.children.map((cell) => this.cellToString(cell as RemarkNode));

            for(let i = 0; i < headers.length; i++) {
                // @ts-ignore
                if(!json[headers[i]]) json[headers[i]] = [];
                // @ts-ignore
                json[headers[i]].push(cells[i]);
            }
        }
        
        const jsonNode = {
            type: "code",
            lang: "json",
            visited: true,
            value: JSON.stringify(json, null, this.minify ? 0 : 4)
        } as RemarkNode;

        Object.assign(node, jsonNode);
	}

	private dfs(node: RemarkNode, callback?: (node: RemarkNode) => void) {
		if (node.visited) return;

		node.visited = true;
		callback?.(node);
		node.children?.forEach((child) => this.dfs(child, callback));
	}
}