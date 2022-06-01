import { AtRule, Root } from 'postcss';
import { parse } from 'postcss-scss';
import valueParser from 'postcss-value-parser';

export function migrateFile(content: string): string {
	const root = parse(content);

	root.walkAtRules('import', (rule) => {
		['@lucca-front/scss/src/mixins', '@lucca-front/icons/src/mixins', 'theming'].some((name) => removeImportNode(rule, name));
	});

	const titles = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
	let titleMixinUsages = 0;
	root.walkAtRules('include', (rule) => {
		rule.params = valueParser(rule.params)
			.walk((node) => {
				const needsUpdate = ['function', 'word'].includes(node.type) && titles.includes(node.value);

				if (needsUpdate) {
					titleMixinUsages++;
					node.value = `title.${node.value}`;
				}
			})
			.toString();
	});

	if (titleMixinUsages) {
		addMixinImport(root, '@lucca-front/scss/src/components/title');
	}

	return root.toResult().css;
}

function addMixinImport(root: Root, mixin: string) {
	/**
	 * @type {AtRule}
	 */
	let lastImportRule: AtRule | undefined;

	root.walkAtRules(/(import|use)/, (rule) => {
		lastImportRule = rule;
	});

	const newImportRule = new AtRule({ name: 'use', params: `'${mixin}'` });

	if (lastImportRule) {
		newImportRule.raws.before = '\n';
		lastImportRule.after(newImportRule);
	} else {
		root.first?.before(newImportRule);
	}
}

/**
 * @returns {boolean} returns true if whole node is deleted
 */
function removeImportNode(atRule: AtRule, name: string): boolean {
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
