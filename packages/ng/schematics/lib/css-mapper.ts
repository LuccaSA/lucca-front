import { migrateFile } from './schematics';
import { Tree } from '@angular-devkit/schematics';
import { PostCssScssLib, PostCssSelectorParserLib, updateCSSClassNamesInRules, updateCSSVariableNames, updateMixinNames } from './scss-ast';
import type { ValueParser } from 'postcss-value-parser';
import { AngularCompilerLib, HtmlAst, HtmlAstVisitor, updateCssClassNames } from './html-ast';
import { applyUpdates, FileUpdate, updateContent } from './file-update';
import { createSourceFile, forEachChild, isStringLiteral, ScriptTarget } from 'typescript';
import { replaceStringLiterals } from './typescript-ast';
import { createVisitor, extractNgTemplates } from './angular-template';

interface Mappings {
	classes: Record<string, string>;
	variables: Record<string, string>;
	mixins: Record<string, string>;
}

export class CssMapper {
	private mappings: Mappings = {
		classes: this.expand(this.rawMappings.classes),
		variables: this.expand(this.rawMappings.variables),
		mixins: this.expand(this.rawMappings.mixins),
	};
	private classesToUpdate = new Set(Object.keys(this.mappings.classes));
	private varsToUpdate = new Set(Object.keys(this.mappings.variables));

	constructor(private tree: Tree, private rawMappings: Mappings, private mappingProps?: Record<string, Record<string, string>>) {}

	async run() {
		const postCssScss = await import('../lib/local-deps/postcss-scss.js');
		const angularCompiler = await import('@angular/compiler');
		const { postcssValueParser } = await import('../lib/local-deps/postcss-value-parser.js');
		const { postcssSelectorParser } = await import('../lib/local-deps/postcss-selector-parser.js');
		this.tree.visit((path, entry) => {
			if (path.includes('node_modules') || !entry) {
				return;
			}
			if (path.endsWith('.scss')) {
				migrateFile(path, entry, this.tree, (content) => this.migrateScssFile(content, postCssScss, postcssValueParser, postcssSelectorParser));
			}
			if (path.endsWith('.html')) {
				migrateFile(path, entry, this.tree, (content) => this.migrateHTMLFile(content, angularCompiler));
			}
			if (path.endsWith('.ts')) {
				migrateFile(path, entry, this.tree, (content) => this.migrateTsFile(path, content, angularCompiler));
			}
		});
	}

	private migrateScssFile(content: string, postCssScss: PostCssScssLib, postcssValueParser: ValueParser, postcssSelectorParser: PostCssSelectorParserLib): string {
		const root = postCssScss.parse(content);

		updateMixinNames(root, this.mappings.mixins);
		updateCSSVariableNames(root, this.mappings.variables, postcssValueParser);
		updateCSSClassNamesInRules(root, this.mappings.classes, postcssSelectorParser);

		return root.toResult({ syntax: { stringify: postCssScss.stringify } }).css;
	}

	private migrateHTMLFile(content: string, angularCompiler: AngularCompilerLib): string {
		content = updateCssClassNames(content, this.mappings.classes, angularCompiler);

		return updateContent(content, (updates) => {
			const htmlAst = new HtmlAst(content, angularCompiler);
			htmlAst.visitElements(/.*/, (elem) => {
				const elAst = new HtmlAstVisitor(elem, angularCompiler);
				elAst.visitBoundAttribute(/.*/, (attr) => {
					if (attr.valueSpan && attr.value instanceof angularCompiler.ASTWithSource) {
						const attrValue = attr.value.source || '';
						const sourcefile = createSourceFile('', attrValue, ScriptTarget.ESNext);

						updates.push(
							...replaceStringLiterals(sourcefile, this.mappings.classes).map((update) => ({
								...update,
								position: (attr.valueSpan?.start.offset ?? 0) + update.position,
							})),
						);
					}
				});
				elem.attributes.forEach((attr) => {
					if (attr.name === 'class' && attr.valueSpan) {
						updates.push({
							position: attr.valueSpan.start.offset,
							oldContent: attr.value,
							newContent: this.updateCssText(attr.value),
						});
					}
				});
			});
		});
	}

	private migrateTsFile(fileName: string, content: string, angularCompiler: AngularCompilerLib): string {
		const sourcefile = createSourceFile(fileName, content, ScriptTarget.ESNext);
		const templates = extractNgTemplates(sourcefile);

		const updates: FileUpdate[] = templates.map((tpl) => ({
			position: tpl.offsetStart,
			oldContent: tpl.content,
			newContent: updateCssClassNames(tpl.content, this.mappings.classes, angularCompiler),
		}));

		forEachChild(
			sourcefile,
			createVisitor(isStringLiteral, (node) => {
				const newText = this.updateCssText(node.text);
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

	private updateCssText(text: string): string {
		const withoutClass = text.replace('class.', '');
		const withoutStyle = text.replace('style.', '');
		if (this.classesToUpdate.has(text)) {
			return this.mappings.classes[text];
		}
		if (this.classesToUpdate.has(withoutClass)) {
			return 'class.' + this.mappings.classes[withoutClass];
		}
		if (this.varsToUpdate.has(text)) {
			return this.mappings.variables[text] || text;
		}
		if (this.varsToUpdate.has(withoutStyle)) {
			return 'style.' + this.mappings.variables[withoutStyle] || text;
		}
		const splitWithSpace = text.split(' ');
		if (splitWithSpace.length > 1) {
			return splitWithSpace.map((entry) => this.updateCssText(entry)).join(' ');
		}
		return text;
	}

	private camelize(str: string): string {
		return str[0].toLowerCase() + str.slice(1);
	}

	private pascalize(str: string): string {
		return str[0].toUpperCase() + str.slice(1);
	}

	private expand(rawMapping: Record<string, string>): Record<string, string> {
		const props = this.mappingProps || {};

		const replaceValue = (oldValue: string, map: string, newValue: string) => {
			return oldValue.replace(`{${map}}`, newValue).replace(`{${this.pascalize(map)}}`, this.pascalize(newValue));
		};

		return Object.fromEntries(
			Object.entries(rawMapping).flatMap(([oldTemplate, newTemplate]) => {
				const placeholders = [...oldTemplate.matchAll(/\{(\w*)}/g)].map(([, template]) => template);
				let values = [[oldTemplate, newTemplate]];

				for (const placeholder of placeholders) {
					const map = this.camelize(placeholder);

					if (!map || !(map in props)) {
						throw new Error(`No mapping for ${map} found`);
					}

					values = values.flatMap(([oldVal, newVal]) => Object.entries(props[map]).map(([key, value]) => [replaceValue(oldVal, map, key), replaceValue(newVal, map, value)]));
				}

				return values;
			}),
		) as Record<string, string>;
	}
}
