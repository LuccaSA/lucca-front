import { Root } from 'postcss';
import { commentNode, ValueNode } from '../utils';

export function updateThemeMixin(root: Root) {
	root.walkDecls((decl) => {
		const valueNode = new ValueNode(decl.value);
		valueNode.walkFunction('_theme', (funcNode) => {
			const isUnsupported = funcNode.nodes.length > 1;
			if (isUnsupported) {
				commentNode(decl, 'Utilisation de _theme non gérée par la migration automatique');
				return false;
			}

			const themeVar = funcNode.nodes[0].value.replace(/\./g, '-');
			funcNode.value = 'var';
			funcNode.nodes = new ValueNode(`--${themeVar}`).nodes;

			return undefined;
		});

		decl.value = valueNode.toString();
	});
}
