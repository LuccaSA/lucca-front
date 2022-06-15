import { Declaration, Root } from 'postcss';
import { ScssValueAst } from '../lib/scss-value-ast';

export function updateIconSizing(root: Root) {
	root.walkAtRules('include', (atRule) => {
		const valueNode = new ScssValueAst(atRule.params);

		valueNode.walkFunction('iconSizing', (funcNode) => {
			const size = funcNode.nodes[0].value;
			atRule.replaceWith(
				new Declaration({
					prop: 'font-size',
					value: `calc(var(--sizes-${size}-font-size) * 1.25)`,
				}),
			);
		});
	});
}
