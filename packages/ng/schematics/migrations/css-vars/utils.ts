import { AtRule, Comment, Container, Document, Node, Root } from 'postcss';
import valueParser from 'postcss-value-parser';

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

export function replaceMixinUsage(root: Root, mixins: string[] | Record<string, string>, mixinsImport: string, namespace = '') {
	let mixinUsages = 0;

	const mixinsPrefix = namespace || mixinsImport.split('/').reverse()[0];
	const mixinsMap = Array.isArray(mixins) ? mixins.reduce((acc, mixin) => ({ ...acc, [mixin]: mixin }), {}) : mixins;

	root.walkAtRules('include', (rule) => {
		rule.params = valueParser(rule.params)
			.walk((node) => {
				const needsUpdate = ['function', 'word'].includes(node.type) && mixinsMap[node.value];

				if (needsUpdate) {
					mixinUsages++;
					node.value = `${mixinsPrefix}.${mixinsMap[node.value]}`;
				}
			})
			.toString();
	});

	if (mixinUsages) {
		addMixinImport(root, mixinsImport, namespace);
	}
	return mixinUsages;
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
