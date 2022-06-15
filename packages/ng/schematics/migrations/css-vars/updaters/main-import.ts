import { AtRule, Node, Root } from 'postcss';
import { addImport, removeImportNode } from '../lib/scss-ast';

export function updateMainImport(root: Root) {
	let hasMainScss = false;
	let hasMainNg = false;

	root.walkAtRules('import', (atRule) => {
		if (atRule.params.includes('scss/src/theming.overridable')) {
			removeImportNode(atRule, 'scss/src/theming.overridable');
		}
		if (atRule.params.includes('scss/src/main.overridable')) {
			removeImportNode(atRule, 'scss/src/main.overridable');
			hasMainScss = true;
		}
		if (atRule.params.includes('ng/style/main.overridable')) {
			removeImportNode(atRule, 'ng/style/main.overridable');
			hasMainNg = true;
		}
	});

	if (hasMainScss) {
		addForwardRule(root, '@lucca-front/scss/src/commons');
		addForwardRule(root, '@lucca-front/scss/src/components');
	}
	if (hasMainNg) {
		addForwardRule(root, '@lucca-front/ng/style/main');
	}
}

function addForwardRule(root: Root, name: string) {
	let lastForwardRule: AtRule | undefined;

	root.walkAtRules('forward', (rule) => {
		lastForwardRule = rule;
	});

	let afterNode: Node | undefined = lastForwardRule;

	if (!afterNode && root.first?.type === 'comment') {
		afterNode = root.first;
	}

	addImport(root, new AtRule({ name: 'forward', params: `'${name}'` }), afterNode);
}
