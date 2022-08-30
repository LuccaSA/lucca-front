import type { Root } from 'postcss';
import type { ValueParser } from 'postcss-value-parser';
import { addForwardRule, PostCssLib, removeImportNode } from '../../../lib/scss-ast.js';

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
		if (atRule.params.includes('scss/src/theming')) {
			removeImportNode(atRule, 'scss/src/theming', postCssValueParser);
		}
		if (atRule.params.includes('scss/src/main')) {
			removeImportNode(atRule, 'scss/src/main', postCssValueParser);
			hasMainScss = true;
		}
		if (atRule.params.includes('ng/style/main')) {
			removeImportNode(atRule, 'ng/style/main', postCssValueParser);
			hasMainNg = true;
		}
	});

	if (hasMainScss) {
		addForwardRule(root, '@lucca-front/icons/src/main', postCss);
		addForwardRule(root, '@lucca-front/scss/src/main', postCss);
	}
	if (hasMainNg) {
		addForwardRule(root, '@lucca-front/ng/src/main', postCss);
	}
}
