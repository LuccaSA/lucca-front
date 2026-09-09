import type { AtRule, Container, Declaration, Node, Root } from 'postcss';
import type { FunctionNode, Node as ValueNode, ValueParser } from 'postcss-value-parser';
import { ScssValueAst } from './scss-value-ast.js';

export type PostCssSelectorParserLib = typeof import('./local-deps/postcss-selector-parser.js').postcssSelectorParser;
export type PostCssLib = typeof import('./local-deps/postcss.js').postCss;
export type PostCssScssLib = typeof import('./local-deps/postcss-scss.js');

export function removeContainerIfEmpty(node: Container | undefined): void {
	if (!node) {
		return;
	}

	if (!node.nodes?.length) {
		const { parent } = node;

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		const semicolon = node.raws.semicolon;

		const nextOrParentNode = node.next() || node.parent;
		node.remove();

		if (semicolon) {
			if (nextOrParentNode) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
				nextOrParentNode.raws.semicolon = semicolon;
			}
		}

		if (!parent || parent.type === 'document') {
			return;
		}

		removeContainerIfEmpty(parent as Container);
	}
}

export function addMixinImport(root: Root, mixin: string, postCss: PostCssLib, namespace = ''): AtRule {
	let lastImportRule: AtRule | undefined;

	root.walkAtRules(/(import|use)/, (rule) => {
		lastImportRule = rule;
	});

	let importStr = `'${mixin}'`;

	if (namespace) {
		importStr += ` as ${namespace}`;
	}

	const newImportRule = new postCss.AtRule({ name: 'use', params: importStr });

	return addImport(root, newImportRule, lastImportRule);
}

export function addImport(root: Root, atRule: AtRule, afterNode?: Node): AtRule {
	if (afterNode) {
		atRule.raws.before = '\n';
		afterNode.after(atRule);
	} else {
		const firstNode = root.first;

		if (firstNode) {
			root.first.before(atRule);
			firstNode.raws.before = '\n\n';
		} else {
			root.append(atRule);
		}
	}
	return atRule;
}

export function addForwardRule(root: Root, name: string, postCss: PostCssLib, afterNode?: Node): AtRule {
	if (!afterNode) {
		root.walkAtRules('forward', (rule) => {
			afterNode = rule;
		});
	}

	if (!afterNode && root.first?.type === 'comment') {
		afterNode = root.first;
	}

	return addImport(root, new postCss.AtRule({ name: 'forward', params: `'${name}'` }), afterNode);
}

export function updateMixinNames(root: Root, mappingOldToNew: Record<string, string>) {
	root.walkAtRules('include', (rule) => {
		rule.params = mappingOldToNew[rule.params] || rule.params;
	});
}

export function updateCSSClassNamesInRules(root: Root, mappingOldToNew: Record<string, string>, postScssSelectorParser: PostCssSelectorParserLib) {
	root.walkRules((rule) => {
		if (rule.selector.endsWith(':')) {
			/**
			 * In sass we can do such a thing:
			 * .foo {
			 * 		padding: {
			 * 			block-start: 10px;
			 * 			block-end: 10px;
			 * 		}
			 * }
			 * "padding:" is considered as a rule but its selector cannot be parsed using postScssSelectorParser
			 */
			return;
		}

		const selector = postScssSelectorParser().astSync(rule.selector);
		selector.walkClasses((classNode) => {
			// Exclude interpolation and function calls
			if (classNode.value.includes('#{') || classNode.value.includes('(')) {
				return;
			}
			classNode.value = mappingOldToNew[classNode.value] || classNode.value;
		});
		rule.selector = selector.toString();
	});
}

export function updateCSSVariableNames(root: Root, mappingOldToNew: Record<string, string>, postcssValueParser: ValueParser) {
	root.walkDecls((decl) => {
		if (decl.prop.startsWith('--')) {
			decl.prop = mappingOldToNew[decl.prop] || decl.prop;
		}

		const valueNode = new ScssValueAst(decl.value, postcssValueParser);

		valueNode.walkFunction('var', (funcNode) => {
			const varName = funcNode.nodes[0]?.value ?? '';
			const newVarName = varName && mappingOldToNew[varName];

			if (newVarName) {
				funcNode.nodes = new ScssValueAst(newVarName, postcssValueParser).nodes;
			}
		});

		decl.value = valueNode.toString();
	});

	root.walkAtRules((decl) => {
		const paramsNode = new ScssValueAst(decl.params, postcssValueParser);
		paramsNode.walkFunction('var', (funcNode) => {
			const varName = funcNode.nodes[0]?.value ?? '';
			const newVarName = varName && mappingOldToNew[varName];

			if (newVarName) {
				funcNode.nodes = new ScssValueAst(newVarName, postcssValueParser).nodes;
			}
		});
		decl.params = paramsNode.toString();
	});
}

/**
 * @returns {boolean} returns true if whole node is deleted
 */
export function removeImportNode(atRule: AtRule, name: string, postcssValueParser: ValueParser): boolean {
	if (atRule.params.includes(name)) {
		const parsed = new ScssValueAst(atRule.params, postcssValueParser);
		const imports = parsed.nodes.filter((n) => n.type === 'string');

		if (imports.length === 1) {
			// Remove the whole import
			atRule.remove();
			return true;
		}

		// Remove node matching condition
		parsed.nodes = parsed.nodes.filter((n) => n.type !== 'string' || !n.value.includes(name));

		// Remove first node if divider
		if (parsed.nodes[0]?.type === 'div') {
			parsed.nodes = parsed.nodes.slice(1);
		}
		// Remove last node if divider
		if (parsed.nodes[parsed.nodes.length - 1]?.type === 'div') {
			parsed.nodes = parsed.nodes.slice(0, -1);
		}

		// Remove consecutive divider nodes
		parsed.nodes = parsed.nodes.filter((n, index) => n.type !== 'div' || parsed.nodes[index + 1]?.type !== 'div');

		atRule.params = parsed.toString();
	}

	return false;
}

export function commentNode(node: AtRule | Declaration, comment: string, postCss: PostCssLib): void {
	const commentNode = new postCss.Comment({ text: `[LF NEXT] ${comment}`, raws: { inline: true, right: '' } });

	const leadingSpaceOrigin = node.raws.before?.match(/ +/)?.[0].length ?? 0;

	const commentCodeNodes = node
		.toString()
		.split('\n')
		.map((text) => {
			const leadingSpaces = (text.match(/^ +/)?.[0] || '').slice(leadingSpaceOrigin) + ' ';
			return new postCss.Comment({ text: text.trim(), raws: { inline: true, right: '', left: leadingSpaces } });
		});

	const originalBefore = node.raws.before;

	node.replaceWith(commentNode, ...commentCodeNodes);

	commentNode.raws.before = originalBefore;
	commentCodeNodes[0].raws.before = commentCodeNodes[0].raws.before?.replace(/\n+/, '\n');
}

export function wrapWithCalcFunctionNode(rootValueNode: ScssValueAst, node: ValueNode, postcssValueParser: ValueParser): void {
	const parent = rootValueNode.getParent(node);

	if (parent?.type === 'function' && parent.value === 'calc') {
		return;
	}

	// Split function argument
	const { chunks, separators } = split(parent?.nodes ?? rootValueNode.nodes, (n) => n.type === 'div');

	const updated = chunks.map((block) => {
		// Wrap block inside a calc()
		return block.includes(node) ? new ScssValueAst(`calc(${rootValueNode.stringify(...block)})`, postcssValueParser).nodes : block;
	});

	const newNodes = join(updated, separators);

	if (parent) {
		parent.nodes = newNodes;
	} else {
		rootValueNode.nodes = newNodes;
	}
}

const COLOR_UTILS_IMPORT = '@lucca-front/scss/src/commons/utils/color';

/**
 * Transforms rgba(var(--x-rgb), alpha) → color.transparentize(var(--palette-x), alpha)
 * and rgb(var(--x-rgb)) → var(--palette-x).
 * Adds @use for the color utils if any rgba replacement happened.
 */
export function updateRgbaToTransparentize(
	root: Root,
	rgbVarMappings: Record<string, string>,
	postcssValueParser: ValueParser,
	postCss: PostCssLib,
): void {
	let hasRgba = false;

	root.walkDecls((decl) => {
		const valueAst = new ScssValueAst(decl.value, postcssValueParser);
		let changed = false;

		valueAst.walkFunction(/^rgba?$/, (funcNode) => {
			const isRgba = funcNode.value === 'rgba';

			const varNode = funcNode.nodes.find(
				(n): n is FunctionNode => n.type === 'function' && n.value === 'var',
			);
			if (!varNode) {
				return;
			}

			const varName = varNode.nodes[0]?.value ?? '';
			const newVarName = rgbVarMappings[varName];
			if (!newVarName) {
				return;
			}

			const hasAlpha = funcNode.nodes.some((n) => n.type === 'word');

			if (isRgba || hasAlpha) {
				varNode.nodes = [{ type: 'word', value: newVarName, sourceIndex: 0, sourceEndIndex: newVarName.length }];
				funcNode.value = 'color.transparentize';
				hasRgba = true;
			} else {
				// rgb(var(--x-rgb)) → var(--palette-x)
				funcNode.value = 'var';
				funcNode.nodes = [{ type: 'word', value: newVarName, sourceIndex: 0, sourceEndIndex: newVarName.length }];
			}
			changed = true;
		});

		if (changed) {
			decl.value = valueAst.toString();
		}
	});

	if (!hasRgba) {
		return;
	}

	let colorImportExists = false;
	root.walkAtRules(/(import|use)/, (rule) => {
		if (rule.params.includes(COLOR_UTILS_IMPORT)) {
			colorImportExists = true;
		}
	});

	if (!colorImportExists) {
		addMixinImport(root, COLOR_UTILS_IMPORT, postCss);
	}
}

function split<T>(array: T[], predicate: (item: T) => boolean): { chunks: T[][]; separators: T[] } {
	const chunks: T[][] = [];
	const separators: T[] = [];
	let current: T[] = [];

	for (const item of array) {
		if (predicate(item)) {
			separators.push(item);
			chunks.push(current);
			current = [];
		} else {
			current.push(item);
		}
	}

	chunks.push(current);

	return { chunks, separators };
}

function join<T>(array: T[][], separators: T[]): T[] {
	return array.reduce((acc, chunk, index) => (index === 0 ? chunk : [...acc, separators[index - 1], ...chunk]), []);
}
