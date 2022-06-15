import { Declaration, Root } from 'postcss';
import { ValueNode } from '../utils';

export function updateIconSizing(root: Root) {
	root.walkAtRules('include', (atRule) => {
		const valueNode = new ValueNode(atRule.params);

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
