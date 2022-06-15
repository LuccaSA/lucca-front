import { Declaration, Root } from 'postcss';
import { FunctionNode } from 'postcss-value-parser';
import { commentNode } from '../lib/scss-ast';
import { ScssValueAst } from '../lib/scss-value-ast';

export function updateThemeMixin(root: Root) {
	root.walkDecls((decl) => {
		const valueNode = new ScssValueAst(decl.value);

		// _theme("spacings.smallest") => var(--spacings-smallest)
		valueNode.walkFunction('_theme', (funcNode) =>
			updateThemeNode(funcNode, decl, (themeVar) => {
				funcNode.value = 'var';
				funcNode.nodes = new ScssValueAst(`--${themeVar}`).nodes;
			}),
		);

		// _component("navSide.width") => var(--components-navSide-width)
		valueNode.walkFunction('_component', (funcNode) =>
			updateThemeNode(funcNode, decl, (themeVar) => {
				funcNode.value = 'var';
				funcNode.nodes = new ScssValueAst(`--components-${themeVar}`).nodes;
			}),
		);

		// -_theme("spacings.smallest") => calc(var(--spacings-smallest) -1)
		valueNode.walkFunction('-_theme', (funcNode) =>
			updateThemeNode(funcNode, decl, (themeVar) => {
				funcNode.value = 'calc';
				funcNode.nodes = new ScssValueAst(`var(--${themeVar}) * -1`).nodes;
			}),
		);

		// -_component("navSide.width") => calc(var(--components-navSide-width) -1)
		valueNode.walkFunction('-_component', (funcNode) =>
			updateThemeNode(funcNode, decl, (themeVar) => {
				funcNode.value = 'calc';
				funcNode.nodes = new ScssValueAst(`var(--components-${themeVar}) * -1`).nodes;
			}),
		);

		decl.value = valueNode.toString();
	});
}

function updateThemeNode(funcNode: FunctionNode, declaration: Declaration, updater: (themeVar: string) => unknown): false | void {
	const isUnsupported = funcNode.nodes.length > 1;
	if (isUnsupported) {
		commentNode(declaration, `Utilisation de ${funcNode.value} non gérée par la migration automatique`);
		return false;
	}

	const themeVar = funcNode.nodes[0].value.replace(/\./g, '-');
	updater(themeVar);

	return undefined;
}
