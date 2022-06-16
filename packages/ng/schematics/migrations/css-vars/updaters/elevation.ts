import type { Root } from 'postcss';
import type { ValueParser } from 'postcss-value-parser';
import { PostCssLib } from '../../../lib/scss-ast';
import { ScssValueAst } from '../../../lib/scss-value-ast';

export function updateElevation(root: Root, postCss: PostCssLib, postCssValueParser: ValueParser) {
	root.walkAtRules('include', (atRule) => {
		const valueNode = new ScssValueAst(atRule.params, postCssValueParser);

		valueNode.walkFunction('elevate', (funcNode) => {
			const level = funcNode.nodes[0].value;
			atRule.before(
				new postCss.Declaration({
					prop: 'box-shadow',
					value: `var(--commons-elevation-elevation-${level})`,
				}),
			);
			atRule.remove();
		});
	});
}
