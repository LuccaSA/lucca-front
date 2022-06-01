import { AtRule, Comment, Container, Document, Node, Root } from 'postcss';
import valueParser, { FunctionNode, ParsedValue } from 'postcss-value-parser';

export function removeContainerIfEmpty(node: Container | undefined): void {
	if (!node) {
		return;
	}

	if (!node.nodes.length) {
		const { parent } = node;
		node.remove();

		if (parent instanceof Document) {
			return;
		}

		removeContainerIfEmpty(parent);
	}
}

export function addMixinImport(root: Root, mixin: string, namespace = '') {
	/**
	 * @type {AtRule}
	 */
	let lastImportRule: AtRule | undefined;

	root.walkAtRules(/(import|use)/, (rule) => {
		lastImportRule = rule;
	});

	let importStr = `'${mixin}'`;

	if (namespace) {
		importStr += ` as ${namespace}`;
	}

	const newImportRule = new AtRule({ name: 'use', params: importStr });

	if (lastImportRule) {
		newImportRule.raws.before = '\n';
		lastImportRule.after(newImportRule);
	} else {
		const firstNode = root.first;
		root.first?.before(newImportRule);

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
		if (parsed.nodes[0].type === 'div') {
			parsed.nodes = parsed.nodes.slice(1);
		}
		// Remove last node if divider
		if (parsed.nodes[parsed.nodes.length - 1].type === 'div') {
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
