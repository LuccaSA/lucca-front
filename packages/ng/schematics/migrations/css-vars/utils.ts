import { AtRule, Comment, Container, Document, Node, Root } from 'postcss';
import valueParser, { FunctionNode, Node as ValueParserNode, ParsedValue } from 'postcss-value-parser';

export function removeContainerIfEmpty(node: Container | undefined): void {
	if (!node) {
		return;
	}

	if (!node.nodes.length) {
		const { parent } = node;

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		const semicolon = node.raws.semicolon;

		const nextOrParentNode = node.next() || node.parent;
		node.remove();

		if (semicolon) {
			if (nextOrParentNode) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
				nextOrParentNode.raws.semicolon = semicolon;
			}
		}

		if (parent instanceof Document) {
			return;
		}

		removeContainerIfEmpty(parent);
	}
}

export function addMixinImport(root: Root, mixin: string, namespace = '') {
	let lastImportRule: AtRule | undefined;

	root.walkAtRules(/(import|use)/, (rule) => {
		lastImportRule = rule;
	});

	let importStr = `'${mixin}'`;

	if (namespace) {
		importStr += ` as ${namespace}`;
	}

	const newImportRule = new AtRule({ name: 'use', params: importStr });

	addImport(root, newImportRule, lastImportRule);
}

export function addImport(root: Root, atRule: AtRule, afterNode?: Node) {
	if (afterNode) {
		atRule.raws.before = '\n';
		afterNode.after(atRule);
	} else {
		const firstNode = root.first;
		root.first?.before(atRule);

		if (firstNode) {
			firstNode.raws.before = '\n\n';
		}
	}
}

/**
 * @returns {boolean} returns true if whole node is deleted
 */
export function removeImportNode(atRule: AtRule, name: string): boolean {
	if (atRule.params.includes(name)) {
		const parsed = valueParser(atRule.params);
		const imports = parsed.nodes.filter((n) => n.type === 'string');

		if (imports.length === 1) {
			// Remove the whole import
			atRule.remove();
			return true;
		}

		// Remove node matching condition
		parsed.nodes = parsed.nodes.filter((n) => n.type !== 'string' || !n.value.includes(name));

		// Remove first node if divider
		if (parsed.nodes[0]?.type === 'div') {
			parsed.nodes = parsed.nodes.slice(1);
		}
		// Remove last node if divider
		if (parsed.nodes[parsed.nodes.length - 1]?.type === 'div') {
			parsed.nodes = parsed.nodes.slice(0, -1);
		}

		// Remove consecutive divider nodes
		parsed.nodes = parsed.nodes.filter((n, index) => n.type !== 'div' || parsed.nodes[index + 1]?.type !== 'div');

		atRule.params = parsed.toString();
	}

	return false;
}

export function commentNode(node: Node, comment: string): void {
	const commentNode = new Comment({ text: `[LF NEXT] ${comment}` });
	node.before(commentNode);
	commentNode.after(new Comment({ text: node.toString() }));
	node.remove();
}

export class ValueNode {
	private parsed: ParsedValue;

	public get nodes(): ValueParserNode[] {
		return this.parsed.nodes;
	}

	constructor(value: string) {
		this.parsed = valueParser(value);
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
