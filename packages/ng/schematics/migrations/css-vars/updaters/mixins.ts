import { Root } from 'postcss';
import alueParser from 'postcss-value-parser';
import { MixinRegistry } from '../mixin-registry';
import { addMixinImport, commentNode } from '../utils';

export function replaceMixin(root: Root, registry: MixinRegistry) {
	const neededNamespaceByImport: Record<string, string | undefined> = {};

	root.walkAtRules('include', (rule) => {
		rule.params = alueParser(rule.params)
			.walk((node) => {
				if (!['function', 'word'].includes(node.type)) {
					return undefined;
				}

				const mixin = registry.getByName(node.value);

				if (mixin) {
					neededNamespaceByImport[mixin.import] = mixin.namespace;
					node.value = `${mixin.prefix}.${mixin.newName}`;
					return false;
				}

				commentNode(rule, 'Mixins non gérée par la migration auto.');
				return false;
			})
			.toString();
	});

	for (const [neededImport, namespace] of Object.entries(neededNamespaceByImport)) {
		addMixinImport(root, neededImport, namespace);
	}
}
