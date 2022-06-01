import { Root } from 'postcss';
import { removeContainerIfEmpty, ValueNode } from '../utils';

export function removeIE11ThemeSupport(root: Root) {
	root.walkDecls((decl) => {
		const valueNode = new ValueNode(decl.value);

		valueNode.walkFunction(/(_theme|_color|_safeGet)/, (funcNode) => {
			const hasModeIE = funcNode.nodes[funcNode.nodes.length - 1]?.value === 'true';

			if (hasModeIE) {
				const { parent } = decl;
				decl.remove();
				removeContainerIfEmpty(parent);
				return false;
			}

			return undefined;
		});
	});
}
