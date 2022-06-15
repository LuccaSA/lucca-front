import { Declaration, Root } from 'postcss';
import { ScssValueAst } from '../lib/scss-value-ast';

export function updateElevation(root: Root) {
	root.walkAtRules('include', (atRule) => {
		const valueNode = new ScssValueAst(atRule.params);

		valueNode.walkFunction('elevate', (funcNode) => {
			const level = funcNode.nodes[0].value;
			atRule.before(
				new Declaration({
					prop: 'box-shadow',
					value: `var(--commons-elevation-elevation-${level})`,
				}),
			);
			atRule.remove();
		});
	});
}
