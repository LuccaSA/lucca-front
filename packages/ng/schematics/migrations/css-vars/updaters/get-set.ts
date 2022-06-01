import { Root } from 'postcss';
import valueParser from 'postcss-value-parser';
import { commentNode } from '../utils';

export function updateGetSetFunctions(root: Root) {
	root.walkAtRules((atRule) => {
		const parsedValue = valueParser(atRule.params);

		parsedValue.walk((funcNode) => {
			if (funcNode.type === 'function' && funcNode.value === '_getMap') {
				commentNode(atRule, 'Passer directement par des variables CSS.');
				return false;
			}

			return undefined;
		});
	});

	root.walkDecls((decl) => {
		const parsedValue = valueParser(decl.value);
		parsedValue.walk((funcNode) => {
			if (funcNode.type !== 'function') {
				return undefined;
			}

			if (funcNode.type === 'function' && funcNode.value === '_safeGet') {
				commentNode(decl, 'Passer directement par des variables CSS.');
			}
		});

		decl.value = parsedValue.toString();
	});
}
