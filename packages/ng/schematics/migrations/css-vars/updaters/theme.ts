import type { Declaration, Root } from 'postcss';
import type { FunctionNode, ValueParser } from 'postcss-value-parser';
import { commentNode, PostCssLib, wrapWithCalcFunctionNode } from '../../../lib/scss-ast.js';
import { ScssValueAst } from '../../../lib/scss-value-ast.js';

export function updateThemeMixin(root: Root, postCss: PostCssLib, postcssValueParser: ValueParser) {
	root.walkDecls((decl) => {
		const valueNode = new ScssValueAst(decl.value, postcssValueParser);

		// _theme("spacings.smallest") => var(--spacings-smallest)
		valueNode.walkFunction('_theme', (funcNode) =>
			updateThemeNode(
				funcNode,
				decl,
				(themeVar) => {
					funcNode.value = 'var';
					funcNode.nodes = new ScssValueAst(`--${themeVar}`, postcssValueParser).nodes;

					const siblings = valueNode.getSiblings(funcNode);
					if (siblings.some((s) => s.type === 'word' && s.value === '*')) {
						wrapWithCalcFunctionNode(valueNode, funcNode, postcssValueParser);
					}
				},
				postCss,
			),
		);

		// _component("navSide.width") => var(--components-navSide-width)
		valueNode.walkFunction('_component', (funcNode) =>
			updateThemeNode(
				funcNode,
				decl,
				(themeVar) => {
					funcNode.value = 'var';
					funcNode.nodes = new ScssValueAst(`--components-${themeVar}`, postcssValueParser).nodes;

					const siblings = valueNode.getSiblings(funcNode);
					if (siblings.some((s) => s.type === 'word' && s.value === '*')) {
						wrapWithCalcFunctionNode(valueNode, funcNode, postcssValueParser);
					}
				},
				postCss,
			),
		);

		// -_theme("spacings.smallest") => calc(var(--spacings-smallest) * -1)
		valueNode.walkFunction('-_theme', (funcNode) =>
			updateThemeNode(
				funcNode,
				decl,
				(themeVar) => {
					funcNode.value = 'calc';
					funcNode.nodes = new ScssValueAst(`var(--${themeVar}) * -1`, postcssValueParser).nodes;
				},
				postCss,
			),
		);

		// -_component("navSide.width") => calc(var(--components-navSide-width) -1)
		valueNode.walkFunction('-_component', (funcNode) =>
			updateThemeNode(
				funcNode,
				decl,
				(themeVar) => {
					funcNode.value = 'calc';
					funcNode.nodes = new ScssValueAst(`var(--components-${themeVar}) * -1`, postcssValueParser).nodes;
				},
				postCss,
			),
		);

		decl.value = valueNode.toString();
	});
}

function updateThemeNode(funcNode: FunctionNode, declaration: Declaration, updater: (themeVar: string) => unknown, postCss: PostCssLib): false | void {
	const isUnsupported = funcNode.nodes.length > 1;
	if (isUnsupported) {
		commentNode(declaration, `Utilisation de ${funcNode.value} non gérée par la migration automatique`, postCss);
		return false;
	}

	const themeVar = funcNode.nodes[0].value.replace(/\./g, '-');
	updater(themeVar);

	return undefined;
}
