import { Root } from 'postcss';
import valueParser from 'postcss-value-parser';
import { commentNode } from '../utils';

export function updateThemeMixin(root: Root) {
	root.walkDecls((decl) => {
		const parsedValue = valueParser(decl.value);
		parsedValue.walk((funcNode) => {
			if (funcNode.type !== 'function') {
				return undefined;
			}

			if (funcNode.value === '_theme') {
				const isUnsupported = funcNode.nodes.length > 1;
				if (isUnsupported) {
					commentNode(decl, 'Utilisation de _theme non gérée par la migration automatique');
					return false;
				}

				const themeVar = funcNode.nodes[0].value.replace(/\./g, '-');
				funcNode.value = 'var';
				funcNode.nodes = [
					{
						type: 'word',
						value: `--${themeVar}`,
						sourceEndIndex: 0,
						sourceIndex: 0,
					},
				];
			}

			return undefined;
		});

		decl.value = parsedValue.toString();
	});
}
