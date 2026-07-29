import { Tree } from '@angular-devkit/schematics';
import { createSourceFile, forEachChild, isIdentifier, ScriptTarget } from 'typescript';
import { createVisitor, replaceComponentInput, replaceComponentInputName, updateAngularTemplate } from './angular-template';
import { applyUpdates, FileUpdate, updateContent } from './file-update';
import { HtmlAst, HtmlAstVisitor } from './html-ast';
import { migrateFile } from './schematics';

/**
 * Describes how to migrate a deprecated HTML input attribute on a given element selector:
 * - `""` (empty string): remove the attribute entirely (handles both `attr` and `[attr]="..."`)
 * - `"newName"` (non-empty string): rename the attribute key (value is preserved)
 * - `Record<string, string>`: replace the attribute value(s) while keeping the key
 *   (e.g., `{ "fullpage": "fullPage" }`)
 */
export type AttributeMigration = string | Record<string, string>;

export interface DeprecatedMappings {
	/**
	 * Mapping of deprecated NgModule names to their replacement standalone component/directive names.
	 * The identifier is renamed everywhere it appears in `.ts` files; the import path is kept unchanged.
	 * @example { "LuDateSelectInputModule": "LuDateSelectInputComponent" }
	 */
	modules: Record<string, string>;

	/**
	 * Mapping of deprecated type/interface names to their replacement names.
	 * The identifier is renamed everywhere it appears in `.ts` files; the import path is kept unchanged.
	 * @example { "ILuTranslation": "LuTranslation" }
	 */
	types: Record<string, string>;

	/**
	 * Mapping of HTML element selectors to their deprecated input/output attribute migrations.
	 * Applied to `.html` files and inline templates in `.ts` files.
	 *
	 * Key: HTML element name (e.g., `"lu-divider"`, `"button"`, `"lu-loading"`).
	 * Value: map of `{ attributeName: migration }` where migration is:
	 *   - `""` (empty string) → remove the attribute (both static `attr` and bound `[attr]="..."`)
	 *   - `"newName"` (non-empty string) → rename the attribute key (value is preserved)
	 *   - `{ "oldValue": "newValue" }` → replace the attribute value(s)
	 *
	 * @example
	 * ```typescript
	 * {
	 *   "lu-divider":            { "withRole": "" },
	 *   "button":                { "delete": "critical" },
	 *   "lu-loading":            { "type": { "fullpage": "fullPage" } },
	 *   "lu-single-file-upload": { "illustration": { "paper": "invoice" } },
	 *   "lu-highlight-data":     { "icon": { "manifying-glass": "magnifying-glass" } },
	 * }
	 * ```
	 *
	 * **Not supported (manual migration required):**
	 * - `lu-empty-state-section` icon → illustration/action (conditional logic based on value)
	 * - CoreSelectInputComponent `.grouping` → `.groupingSignal` (requires call-site transformation)
	 */
	inputsOutputs: Record<string, Record<string, AttributeMigration>>;
}

export class DeprecatedMapper {
	private allIdentifierMappings: Record<string, string>;
	private hasTemplateMigrations: boolean;

	constructor(
		private tree: Tree,
		private mappings: DeprecatedMappings,
	) {
		this.allIdentifierMappings = Object.assign(Object.create(null) as Record<string, string>, mappings.modules, mappings.types);
		this.hasTemplateMigrations = Object.keys(mappings.inputsOutputs).length > 0;
	}

	run() {
		this.tree.visit((path, entry) => {
			if (path.includes('node_modules') || !entry) {
				return;
			}

			if (path.endsWith('.ts') && !path.endsWith('.d.ts')) {
				migrateFile(path, entry, this.tree, (content) => this.migrateTsFile(path, content));
			} else if (path.endsWith('.html') && this.hasTemplateMigrations) {
				migrateFile(path, entry, this.tree, (content) => this.migrateTemplate(content));
			}
		});
	}

	private migrateTsFile(fileName: string, content: string): string {
		// 1. Rename TypeScript identifiers (modules & types mappings)
		let result = this.migrateTsIdentifiers(fileName, content);

		// 2. Apply inputsOutputs migrations to any inline Angular template
		if (this.hasTemplateMigrations) {
			result = updateAngularTemplate(fileName, result, (template) => this.migrateTemplate(template));
		}

		return result;
	}

	private migrateTsIdentifiers(fileName: string, content: string): string {
		const sourceFile = createSourceFile(fileName, content, ScriptTarget.ESNext);
		const updates: FileUpdate[] = [];

		forEachChild(
			sourceFile,
			createVisitor(isIdentifier, (node) => {
				const newName = this.allIdentifierMappings[node.text];

				if (newName !== undefined && newName !== node.text) {
					updates.push({
						position: node.getStart(sourceFile),
						oldContent: node.text,
						newContent: newName,
					});
				}
			}),
		);

		return applyUpdates(content, updates);
	}

	/**
	 * Applies all `inputsOutputs` migrations to a template string.
	 * Works on both standalone `.html` content and inline template strings extracted from `.ts` files.
	 */
	private migrateTemplate(template: string): string {
		let result = template;

		for (const [selector, inputs] of Object.entries(this.mappings.inputsOutputs)) {
			for (const [inputName, migration] of Object.entries(inputs)) {
				if (migration === '') {
					result = this.removeAttribute(result, selector, inputName);
				} else if (typeof migration === 'string') {
					result = replaceComponentInputName(selector, inputName, migration, result);
				} else {
					result = replaceComponentInput(selector, inputName, migration, result);
				}
			}
		}

		return result;
	}

	/**
	 * Removes all occurrences of a static or bound attribute on elements matching the given selector.
	 *
	 * Handles:
	 * - Static boolean: `<lu-divider withRole>`
	 * - Static with value: `<lu-divider withRole="true">`
	 * - One-way bound: `<lu-divider [withRole]="expr">`
	 *
	 * The preceding whitespace is included in the removal to keep the markup clean.
	 */
	private removeAttribute(template: string, selector: string, attrName: string): string {
		return updateContent(template, (updates) => {
			const htmlAst = new HtmlAst(template);

			htmlAst.visitElements(selector, (el) => {
				const elAst = new HtmlAstVisitor(el);

				// Static text attribute: `attrName` (boolean) or `attrName="value"`
				elAst.visitAttribute(attrName, (attr) => {
					const from = attr.sourceSpan.start.offset;
					const to = attr.sourceSpan.end.offset;
					const hasLeadingSpace = from > 0 && template[from - 1] === ' ';
					const removeFrom = hasLeadingSpace ? from - 1 : from;
					updates.push({ position: removeFrom, oldContent: template.slice(removeFrom, to), newContent: '' });
				});

				// Bound attribute: `[attrName]="expr"`
				elAst.visitBoundAttribute(attrName, (attr) => {
					const from = attr.sourceSpan.start.offset;
					const to = attr.sourceSpan.end.offset;
					const hasLeadingSpace = from > 0 && template[from - 1] === ' ';
					const removeFrom = hasLeadingSpace ? from - 1 : from;
					updates.push({ position: removeFrom, oldContent: template.slice(removeFrom, to), newContent: '' });
				});
			});
		});
	}
}
