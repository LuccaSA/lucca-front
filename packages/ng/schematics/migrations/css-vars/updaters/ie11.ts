import { Root } from 'postcss';
import valueParser from 'postcss-value-parser';
import { removeContainerIfEmpty } from '../utils';

const ie11Functions = ['_theme', '_color', '_safeGet'];

export function removeIE11ThemeSupport(root: Root) {
	root.walkDecls((decl) => {
		const parsedValue = valueParser(decl.value);
		parsedValue.walk((funcNode) => {
			if (funcNode.type === 'function' && ie11Functions.includes(funcNode.value)) {
				const hasModeIE = funcNode.nodes[funcNode.nodes.length - 1]?.value === 'true';

				if (hasModeIE) {
					const { parent } = decl;
					decl.remove();
					removeContainerIfEmpty(parent);
					return false;
				}
			}

			return undefined;
		});
	});
}
