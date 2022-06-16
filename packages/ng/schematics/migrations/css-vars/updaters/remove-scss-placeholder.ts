import type { Root } from 'postcss';
import type { ValueParser } from 'postcss-value-parser';
import { ScssValueAst } from '../../../lib/scss-value-ast';

/**
 * Replace: calc(100vh - #{_theme(\"commons.banner-height\")} - 3.5rem)
 * With:    calc(100vh - _theme(\"commons.banner-height\") - 3.5rem)
 */
export function removeScssPlaceholders(root: Root, postcssValueParser: ValueParser) {
	root.walkDecls((decl) => {
		const valueNode = new ScssValueAst(decl.value, postcssValueParser);
		valueNode.walkFunction(/.*/, (func) => {
			func.value = func.value.replace(/#\{/g, '');
			func.nodes = func.nodes
				.filter((child) => child.type !== 'word' || child.value !== '}')
				.map((child) =>
					child.value.startsWith('#{') && child.value.endsWith('}')
						? child // Blocks like "#{$publicHoliday-background-color}" should be kept intact as they do not use functions inside
						: { ...child, value: child.value.replace(/\}/g, '') },
				);
		});
		decl.value = valueNode.toString();
	});
}
