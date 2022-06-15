import { Root } from 'postcss';
import { removeContainerIfEmpty } from '../lib/scss-ast';
import { ScssValueAst } from '../lib/scss-value-ast';

export function removeIE11ThemeSupport(root: Root) {
	root.walkDecls((decl) => {
		const valueNode = new ScssValueAst(decl.value);

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
