import type { Root } from 'postcss';
import type { Node, ValueParser } from 'postcss-value-parser';
import { ScssValueAst } from '../../../lib/scss-value-ast.js';

/**
 * Replace: calc(100vh - #{_theme(\"commons.banner-height\")} - 3.5rem)
 * With:    calc(100vh - _theme(\"commons.banner-height\") - 3.5rem)
 */
export function removeScssPlaceholders(root: Root, postcssValueParser: ValueParser) {
	root.walkDecls((decl) => {
		const valueNode = new ScssValueAst(decl.value, postcssValueParser);
		valueNode.walkFunction(/.*/, (func) => {
			let removeNextClosingBracket = 0;

			if (func.value.startsWith('#{')) {
				removeNextClosingBracket++;
				func.value = func.value.slice(2);
			}

			const newNodes: Node[] = [];

			for (const child of func.nodes) {
				if (removeNextClosingBracket && child.type === 'word' && child.value.endsWith('}')) {
					removeNextClosingBracket--;
					if (child.value !== '}') {
						newNodes.push({ ...child, value: child.value.slice(0, -1) });
					}
					// else, do not keep child
				} else if (child.type === 'function' && child.value.startsWith('#{')) {
					removeNextClosingBracket++;
					newNodes.push({ ...child, value: child.value.slice(2) });
				} else {
					newNodes.push(child);
				}
			}

			func.nodes = newNodes;
		});
		decl.value = valueNode.toString();
	});
}
