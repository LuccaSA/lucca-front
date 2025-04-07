import { ScriptTarget, createSourceFile } from 'typescript';
import { extractNgTemplates, replaceComponentInput } from '../lib/angular-template.js';
import { updateContent } from '../lib/file-update.js';
import { HtmlAst, updateCssClassNames } from '../lib/html-ast.js';
import { PostCssSelectorParserLib } from '../lib/local-deps/postcss-selector-parser.js';
import { PostCssScssLib, updateCSSClassNamesInRules } from '../lib/scss-ast.js';
import { replaceStringLiterals } from '../lib/typescript-ast.js';
import { oldIconClassToNewIconClass, oldIconToNewIcon, oldIcons } from './mapping.js';
import { currentSchematicContext } from '../lib/lf-schematic-context';

export function migrateScssFile(content: string, postCssScss: PostCssScssLib, postcssSelectorParser: PostCssSelectorParserLib): string {
	const root = postCssScss.parse(content);

	updateCSSClassNamesInRules(root, oldIconClassToNewIconClass, postcssSelectorParser);

	return root.toResult({ syntax: { stringify: postCssScss.stringify } }).css;
}

export function migrateHTMLFile(content: string): string {
	content = updateCssClassNames(content, oldIconClassToNewIconClass);
	content = replaceComponentInput('lu-icon', 'icon', oldIconToNewIcon, content);

	return updateContent(content, (updates) => {
		const htmlAst = new HtmlAst(content);
		htmlAst.visitElementWithAttribute(/.*/, 'class', (elem, attr) => {
			const legacyIconText = attr.value.includes('lucca-icon') && elem.children.find((c) => c instanceof currentSchematicContext.angularCompiler.TmplAstText && oldIcons.has(c.value));
			if (attr.valueSpan && legacyIconText && legacyIconText instanceof currentSchematicContext.angularCompiler.TmplAstText) {
				updates.push({
					position: legacyIconText.sourceSpan.start.offset,
					oldContent: legacyIconText.value,
					newContent: ''
				});
				updates.push({
					position: attr.valueSpan.start.offset,
					oldContent: attr.value,
					newContent: attr.value.replace('lucca-icon', 'lucca-icon ' + oldIconClassToNewIconClass['icon-' + legacyIconText.value])
				});
			}
		});
	});
}

export function migrateTsFile(fileName: string, content: string): string {
	return updateContent(content, (updates) => {
		const sourcefile = createSourceFile(fileName, content, ScriptTarget.ESNext);
		const templates = extractNgTemplates(sourcefile);

		updates.push(
			...templates.map((tpl) => ({
				position: tpl.offsetStart,
				oldContent: tpl.content,
				newContent: migrateHTMLFile(tpl.content)
			}))
		);

		updates.push(...replaceStringLiterals(sourcefile, oldIconClassToNewIconClass));
	});
}
