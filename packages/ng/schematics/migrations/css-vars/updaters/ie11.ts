import type { Root } from 'postcss';
import type { ValueParser } from 'postcss-value-parser';
import { removeContainerIfEmpty } from '../../../lib/scss-ast.js';
import { ScssValueAst } from '../../../lib/scss-value-ast.js';

export function removeIE11ThemeSupport(root: Root, postcssValueParser: ValueParser) {
	root.walkDecls((decl) => {
		const valueNode = new ScssValueAst(decl.value, postcssValueParser);

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
