import type { ValueParser } from 'postcss-value-parser';
import { createSourceFile, forEachChild, isStringLiteral, ScriptTarget } from 'typescript';
import { createVisitor, extractNgTemplates } from '../../lib/angular-template';
import { applyUpdates, FileUpdate } from '../../lib/file-update.js';
import { AngularCompilerLib, updateCssClassNames } from '../../lib/html-ast.js';
import { PostCssScssLib, PostCssSelectorParserLib, removeImportNode, updateCSSClassNamesInRules, updateCSSVariableNames, updateMixinNames } from '../../lib/scss-ast.js';
import { cssClassesToUpdate, cssClassMapping, cssVariableMapping, cssVarsToUpdate, mixinMapping } from './mapping';

export function migrateScssFile(content: string, postCssScss: PostCssScssLib, postcssValueParser: ValueParser, postcssSelectorParser: PostCssSelectorParserLib): string {
	const root = postCssScss.parse(content);

	updateMixinNames(root, mixinMapping);
	updateCSSVariableNames(root, cssVariableMapping, postcssValueParser);
	updateCSSClassNamesInRules(root, cssClassMapping, postcssSelectorParser);

	root.walkAtRules(/(import|use|forward)/, (rule) => {
		removeImportNode(rule, '@lucca-front/scss/src/components/skipLinks', postcssValueParser);
	});

	return root.toResult({ syntax: { stringify: postCssScss.stringify } }).css;
}

export function migrateHTMLFile(content: string, angularCompiler: AngularCompilerLib): string {
	return updateCssClassNames(content, cssClassMapping, angularCompiler);
}

export function migrateTsFile(fileName: string, content: string, angularCompiler: AngularCompilerLib): string {
	const sourcefile = createSourceFile(fileName, content, ScriptTarget.ESNext);
	const templates = extractNgTemplates(sourcefile);

	const updates: FileUpdate[] = templates.map((tpl) => ({
		position: tpl.offsetStart,
		oldContent: tpl.content,
		newContent: updateCssClassNames(tpl.content, cssClassMapping, angularCompiler),
	}));

	forEachChild(
		sourcefile,
		createVisitor(isStringLiteral, (node) => {
			let newText = node.text;

			const withoutClass = node.text.replace('class.', '');
			const withoutStyle = node.text.replace('style.', '');

			if (cssClassesToUpdate.has(node.text)) {
				newText = cssClassMapping[node.text];
			} else if (cssClassesToUpdate.has(withoutClass)) {
				newText = 'class.' + cssClassMapping[withoutClass];
			} else if (cssVarsToUpdate.has(node.text)) {
				newText = cssVariableMapping[node.text] || node.text;
			} else if (cssVarsToUpdate.has(withoutStyle)) {
				newText = 'style.' + cssVariableMapping[withoutStyle] || node.text;
			}

			if (newText !== node.text) {
				const position = node.pos + node.getLeadingTriviaWidth(sourcefile) /* Spaces before the single/double quote */ + 1; /* Single or double quote before the string content */
				updates.push({
					position,
					oldContent: node.text,
					newContent: newText,
				});
			}
		}),
	);

	return applyUpdates(content, updates);
}
