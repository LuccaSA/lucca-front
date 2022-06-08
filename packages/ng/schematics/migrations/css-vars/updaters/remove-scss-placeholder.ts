import { Root } from 'postcss';
import { ValueNode } from '../utils';

/**
 * Replace: calc(100vh - #{_theme(\"commons.banner-height\")} - 3.5rem)
 * With:    calc(100vh - _theme(\"commons.banner-height\") - 3.5rem)
 */
export function removeScssPlaceholders(root: Root) {
	root.walkDecls((decl) => {
		const valueNode = new ValueNode(decl.value);
		valueNode.walkFunction(/.*/, (func) => {
			func.value = func.value.replace(/#\{/g, '');
			func.nodes = func.nodes.filter((child) => child.type !== 'word' || child.value !== '}').map((child) => ({ ...child, value: child.value.replace(/\}/g, '') }));
		});
		decl.value = valueNode.toString();
	});
}
