import { Declaration, Root } from 'postcss';
import valueParser from 'postcss-value-parser';

export function updateElevation(root: Root) {
	root.walkAtRules('include', (atRule) => {
		const parsedValue = valueParser(atRule.params);
		parsedValue.walk((funcNode) => {
			if (funcNode.type !== 'function') {
				return;
			}

			if (funcNode.value === 'elevate') {
				const level = funcNode.nodes[0].value;
				atRule.before(
					new Declaration({
						prop: 'box-shadow',
						value: `var(--commons-elevation-elevation-${level})`,
					}),
				);
				atRule.remove();
			}
		});
	});
}
