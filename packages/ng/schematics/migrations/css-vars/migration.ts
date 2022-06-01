import { parse } from 'postcss-scss';
import { mixinRegistry } from './mixin-registry';
import { updateColorMixin } from './updaters/color';
import { updateElevation } from './updaters/elevation';
import { updateGetSetFunctions } from './updaters/get-set';
import { removeIE11ThemeSupport } from './updaters/ie11';
import { replaceMixin } from './updaters/mixins';
import { updateThemeMixin } from './updaters/theme';
import { removeContainerIfEmpty, removeImportNode } from './utils';

export function migrateFile(content: string): string {
	const root = parse(content);

	root.walkAtRules('import', (rule) => {
		['@lucca-front/scss/src/mixins', '@lucca-front/icons/src/mixins', 'theming', 'theme'].some((name) => removeImportNode(rule, name));
	});

	removeIE11ThemeSupport(root);
	updateColorMixin(root);
	updateThemeMixin(root);
	updateGetSetFunctions(root);
	updateElevation(root);

	root.walkAtRules('include', (atRule) => {
		if (atRule.params === 'ie11') {
			atRule.remove();
		}
	});

	root.walkDecls('$noCssVar', (node) => {
		node.remove();
	});

	root.walkAtRules('include', (atRule) => {
		if (atRule.params.startsWith('generateCSSVarsFromTheme')) {
			const parent = atRule.parent;
			atRule.remove();
			removeContainerIfEmpty(parent);
		}
	});

	replaceMixin(root, mixinRegistry);

	return root.toResult().css;
}
