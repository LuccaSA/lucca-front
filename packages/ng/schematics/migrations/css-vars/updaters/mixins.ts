import type { Root } from 'postcss';
import type { ValueParser } from 'postcss-value-parser';
import { addMixinImport, commentNode, PostCssLib } from '../../../lib/scss-ast';
import { MixinRegistry } from '../mixin-registry';

interface IFuncMixinWithoutInclude {
	legacy: string;
	register: string;
}

const funcMixins: IFuncMixinWithoutInclude[] = [
	{
		legacy: 'fakeborderoverlay',
		register: 'fakeBorderOverlay',
	},
];

export function replaceFuncMixinsWithoutInclude(root: Root, registry: MixinRegistry, postCss: PostCssLib) {
	const neededNamespaceByImport: Record<string, string | undefined> = {};

	root.walkDecls((decl) => {
		for (const specialMixin of funcMixins) {
			if (!decl.value.includes(specialMixin.legacy)) {
				continue;
			}

			const mixin = registry.getByName(specialMixin.register);
			if (mixin) {
				neededNamespaceByImport[mixin.import] = mixin.namespace;
				decl.value = decl.value.replace(specialMixin.legacy, `${mixin.prefix}.${mixin.newName}`);
				continue;
			}

			commentNode(decl, 'Mixins avec fonction non gérée par la migration auto.', postCss);
		}
	});

	updateMixinImport(root, postCss, neededNamespaceByImport);
}

export function replaceIncludedMixin(root: Root, registry: MixinRegistry, postCss: PostCssLib, postcssValueParser: ValueParser) {
	const neededNamespaceByImport: Record<string, string | undefined> = {};

	root.walkAtRules('include', (rule) => {
		rule.params = postcssValueParser(rule.params)
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

				commentNode(rule, 'Mixins non gérée par la migration auto.', postCss);
				return false;
			})
			.toString();
	});

	updateMixinImport(root, postCss, neededNamespaceByImport);
}

function updateMixinImport(root: Root, postCss: PostCssLib, neededNamespaceByImport: Record<string, string | undefined> = {}): void {
	for (const [neededImport, namespace] of Object.entries(neededNamespaceByImport)) {
		addMixinImport(root, neededImport, postCss, namespace);
	}
}
