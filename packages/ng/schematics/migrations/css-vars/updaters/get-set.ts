import type { Root } from 'postcss';
import type { ValueParser } from 'postcss-value-parser';
import { commentNode, PostCssLib } from '../../../lib/scss-ast';
import { ScssValueAst } from '../../../lib/scss-value-ast';

export function updateGetSetFunctions(root: Root, postCss: PostCssLib, postcssValueParser: ValueParser) {
	root.walkAtRules((atRule) => {
		new ScssValueAst(atRule.params, postcssValueParser).walkFunction('_getMap', () => {
			commentNode(atRule, 'Passer directement par des variables CSS.', postCss);
			return false;
		});
	});

	root.walkDecls((decl) => {
		const valueNode = new ScssValueAst(decl.value, postcssValueParser);

		valueNode.walkFunction('_safeGet', () => {
			commentNode(decl, 'Passer directement par des variables CSS.', postCss);
			return false;
		});

		valueNode.walkFunction('_set', () => {
			commentNode(decl, 'Créer directement des variables CSS.', postCss);
			return false;
		});

		decl.value = valueNode.toString();
	});
}
