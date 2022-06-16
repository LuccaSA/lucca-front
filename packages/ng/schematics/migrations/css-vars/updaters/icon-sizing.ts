import type { Root } from 'postcss';
import { ValueParser } from 'postcss-value-parser';
import { PostCssLib } from '../../../lib/scss-ast';
import { ScssValueAst } from '../../../lib/scss-value-ast';

export function updateIconSizing(root: Root, postCss: PostCssLib, postcssValueParser: ValueParser) {
	root.walkAtRules('include', (atRule) => {
		const valueNode = new ScssValueAst(atRule.params, postcssValueParser);

		valueNode.walkFunction('iconSizing', (funcNode) => {
			const size = funcNode.nodes[0].value;
			atRule.replaceWith(
				new postCss.Declaration({
					prop: 'font-size',
					value: `calc(var(--sizes-${size}-font-size) * 1.25)`,
				}),
			);
		});
	});
}
