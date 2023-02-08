import type { ValueParser } from 'postcss-value-parser';
import { AngularTemplate } from '../../lib/angular-template';
import { applyUpdates, FileUpdate } from '../../lib/file-update.js';
import { AngularCompilerLib, updateCssClassNames } from '../../lib/html-ast.js';
import { PostCssScssLib, PostCssSelectorParserLib, updateCSSClassNamesInRules, updateCSSVariableNames, updateMixinNames } from '../../lib/scss-ast.js';
import { cssClassMapping, cssVariableMapping, mixinMapping } from './mapping';

export function migrateScssFile(content: string, postCssScss: PostCssScssLib, postcssValueParser: ValueParser, postcssSelectorParser: PostCssSelectorParserLib): string {
	const root = postCssScss.parse(content);

	updateMixinNames(root, mixinMapping);
	updateCSSVariableNames(root, cssVariableMapping, postcssValueParser);
	updateCSSClassNamesInRules(root, cssClassMapping, postcssSelectorParser);

	return root.toResult({ syntax: { stringify: postCssScss.stringify } }).css;
}

export function migrateHTMLFile(content: string, angularCompiler: AngularCompilerLib): string {
	return updateCssClassNames(content, cssClassMapping, angularCompiler);
}

export function migrateTsFile(content: string, templates: AngularTemplate[], angularCompiler: AngularCompilerLib): string {
	if (!templates.length) {
		return content;
	}

	const updates: FileUpdate[] = templates.map((tpl) => ({
		position: tpl.offsetStart,
		oldContent: tpl.content,
		newContent: updateCssClassNames(tpl.content, cssClassMapping, angularCompiler),
	}));

	return applyUpdates(content, updates);
}
