import { Root } from 'postcss';
import { commentNode, ValueNode } from '../utils';

export function updateGetSetFunctions(root: Root) {
	root.walkAtRules((atRule) => {
		new ValueNode(atRule.params).walkFunction('_getMap', () => {
			commentNode(atRule, 'Passer directement par des variables CSS.');
			return false;
		});
	});

	root.walkDecls((decl) => {
		const valueNode = new ValueNode(decl.value);

		valueNode.walkFunction('_safeGet', () => {
			commentNode(decl, 'Passer directement par des variables CSS.');
			return false;
		});

		valueNode.walkFunction('_set', () => {
			commentNode(decl, 'Créer directement des variables CSS.');
			return false;
		});

		decl.value = valueNode.toString();
	});
}
