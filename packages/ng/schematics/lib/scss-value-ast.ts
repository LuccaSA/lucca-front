import type { FunctionNode, Node, ParsedValue, ValueParser, WalkCallback } from 'postcss-value-parser';

export class ScssValueAst {
	private parsed: ParsedValue;

	public get nodes(): Node[] {
		return this.parsed.nodes;
	}
	public set nodes(nodes: Node[]) {
		this.parsed.nodes = nodes;
	}

	constructor(
		value: string,
		private postcssValueParser: ValueParser,
	) {
		this.parsed = postcssValueParser(value);
	}

	public getParent(node: Node): FunctionNode | null {
		let parent: FunctionNode | null = null;

		if (this.nodes.includes(node)) {
			return parent;
		}

		this.walkFunction(/.*/, (funcNode) => {
			if (funcNode.nodes.includes(node)) {
				parent = funcNode;
				return false;
			}

			return undefined;
		});

		return parent;
	}

	public getSiblings(node: Node): Node[] {
		const parent = this.getParent(node);
		const nodes = parent === null ? this.nodes : parent.type === 'function' ? parent.nodes : [];

		return nodes.filter((n) => n !== node);
	}

	public stringify(...nodes: Node[]): string {
		const parsed = this.postcssValueParser('');
		parsed.nodes = nodes;
		return parsed.toString();
	}

	public toString(): string {
		return this.parsed.toString();
	}

	public walk(callback: WalkCallback, bubble?: boolean): void {
		this.parsed.walk(callback, bubble);
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
