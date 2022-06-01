import { Declaration, Root } from 'postcss';
import { ValueNode } from '../utils';

export function updateElevation(root: Root) {
	root.walkAtRules('include', (atRule) => {
		const valueNode = new ValueNode(atRule.params);

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
