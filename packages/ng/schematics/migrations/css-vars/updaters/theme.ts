import { Declaration, Root } from 'postcss';
import { FunctionNode } from 'postcss-value-parser';
import { commentNode, ValueNode } from '../utils';

export function updateThemeMixin(root: Root) {
	root.walkDecls((decl) => {
		const valueNode = new ValueNode(decl.value);

		// _theme("spacings.smallest") => var(--spacings-smallest)
		valueNode.walkFunction('_theme', (funcNode) =>
			updateThemeNode(funcNode, decl, (themeVar) => {
				funcNode.value = 'var';
				funcNode.nodes = new ValueNode(`--${themeVar}`).nodes;
			}),
		);

		// -_theme("spacings.smallest") => calc(var(--spacings-smallest) * -1)
		valueNode.walkFunction('-_theme', (funcNode) =>
			updateThemeNode(funcNode, decl, (themeVar) => {
				funcNode.value = 'calc';
				funcNode.nodes = new ValueNode(`var(--${themeVar}) * -1`).nodes;
			}),
		);

		decl.value = valueNode.toString();
	});
}

function updateThemeNode(funcNode: FunctionNode, declaration: Declaration, updater: (themeVar: string) => unknown): false | void {
	const isUnsupported = funcNode.nodes.length > 1;
	if (isUnsupported) {
		commentNode(declaration, 'Utilisation de _theme non gérée par la migration automatique');
		return false;
	}

	const themeVar = funcNode.nodes[0].value.replace(/\./g, '-');
	updater(themeVar);

	return undefined;
}
