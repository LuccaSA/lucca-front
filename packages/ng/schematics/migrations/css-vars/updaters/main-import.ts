import type { AtRule, Node, Root } from 'postcss';
import type { ValueParser } from 'postcss-value-parser';
import { addImport, PostCssLib, removeImportNode } from '../../../lib/scss-ast';

export function updateMainImport(root: Root, postCss: PostCssLib, postCssValueParser: ValueParser) {
	let hasMainScss = false;
	let hasMainNg = false;

	root.walkAtRules('import', (atRule) => {
		if (atRule.params.includes('scss/src/theming.overridable')) {
			removeImportNode(atRule, 'scss/src/theming.overridable', postCssValueParser);
		}
		if (atRule.params.includes('scss/src/main.overridable')) {
			removeImportNode(atRule, 'scss/src/main.overridable', postCssValueParser);
			hasMainScss = true;
		}
		if (atRule.params.includes('ng/style/main.overridable')) {
			removeImportNode(atRule, 'ng/style/main.overridable', postCssValueParser);
			hasMainNg = true;
		}
	});

	if (hasMainScss) {
		addForwardRule(root, '@lucca-front/scss/src/commons', postCss);
		addForwardRule(root, '@lucca-front/scss/src/components', postCss);
	}
	if (hasMainNg) {
		addForwardRule(root, '@lucca-front/ng/style/main', postCss);
	}
}

function addForwardRule(root: Root, name: string, postCss: PostCssLib) {
	let lastForwardRule: AtRule | undefined;

	root.walkAtRules('forward', (rule) => {
		lastForwardRule = rule;
	});

	let afterNode: Node | undefined = lastForwardRule;

	if (!afterNode && root.first?.type === 'comment') {
		afterNode = root.first;
	}

	addImport(root, new postCss.AtRule({ name: 'forward', params: `'${name}'` }), afterNode);
}
