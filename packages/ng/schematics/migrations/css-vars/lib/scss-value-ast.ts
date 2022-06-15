import postcssValueParser, { FunctionNode, Node, ParsedValue } from 'postcss-value-parser';

export class ScssValueAst {
	private parsed: ParsedValue;

	public get nodes(): Node[] {
		return this.parsed.nodes;
	}
	public set nodes(nodes: Node[]) {
		this.parsed.nodes = nodes;
	}

	constructor(value: string) {
		this.parsed = postcssValueParser(value);
	}

	public toString(): string {
		return this.parsed.toString();
	}

	public walkFunction(functionFilter: string | RegExp, callback: (funcNode: FunctionNode) => void | boolean): void {
		this.parsed.walk((node) => {
			if (node.type !== 'function') {
				return;
			}
			if (!this.matchFilter(node.value, functionFilter)) {
				return;
			}

			return callback(node);
		});
	}

	private matchFilter(value: string, filter: string | RegExp): boolean {
		return typeof filter === 'string' ? value === filter : !!value.match(filter);
	}
}
