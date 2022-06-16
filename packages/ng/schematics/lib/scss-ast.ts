import type { AtRule, Container, Declaration, Node, Root } from 'postcss';
import type { ValueParser } from 'postcss-value-parser';
import { ScssValueAst } from './scss-value-ast';

export type PostCssLib = typeof import('./local-deps/postcss').postCss;
export type PostCssScssLib = typeof import('./local-deps/postcss-scss');

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

		if (!parent || parent.type === 'docment') {
			return;
		}

		removeContainerIfEmpty(parent as Container);
	}
}

export function addMixinImport(root: Root, mixin: string, postCss: PostCssLib, namespace = ''): void {
	let lastImportRule: AtRule | undefined;

	root.walkAtRules(/(import|use)/, (rule) => {
		lastImportRule = rule;
	});

	let importStr = `'${mixin}'`;

	if (namespace) {
		importStr += ` as ${namespace}`;
	}

	const newImportRule = new postCss.AtRule({ name: 'use', params: importStr });

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
export function removeImportNode(atRule: AtRule, name: string, postcssValueParser: ValueParser): boolean {
	if (atRule.params.includes(name)) {
		const parsed = new ScssValueAst(atRule.params, postcssValueParser);
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

export function commentNode(node: AtRule | Declaration, comment: string, postCss: PostCssLib): void {
	const commentNode = new postCss.Comment({ text: `[LF NEXT] ${comment}`, raws: { inline: true, right: '' } });

	const leadingSpaceOrigin = node.raws.before?.match(/ +/)?.[0].length ?? 0;

	const commentCodeNodes = node
		.toString()
		.split('\n')
		.map((text) => {
			const leadingSpaces = (text.match(/^ +/)?.[0] || '').slice(leadingSpaceOrigin) + ' ';
			return new postCss.Comment({ text: text.trim(), raws: { inline: true, right: '', left: leadingSpaces } });
		});

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const originalBefore = node.raws.before;

	node.replaceWith(commentNode, ...commentCodeNodes);

	commentNode.raws.before = originalBefore;
	commentCodeNodes[0].raws.before = commentCodeNodes[0].raws.before?.replace(/\n+/, '\n');
}
