import type { Rule, Tree } from '@angular-devkit/schematics';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { TmplAstElement } from '@angular/compiler';
import type { Rule as CssRule } from 'postcss';
import type { ClassName, Selector } from 'postcss-selector-parser';
import { dirname, join } from 'path';
import {
	createSourceFile,
	isCallExpression,
	isDecorator,
	isIdentifier,
	isNoSubstitutionTemplateLiteral,
	isObjectLiteralExpression,
	isPropertyAssignment,
	isStringLiteral,
	Node as TsNode,
	ScriptTarget,
} from 'typescript';
import {
	applyUpdates,
	createVisitor,
	CssMapper,
	currentSchematicContext,
	HtmlAst,
	HtmlAstVisitor,
	migrateFile,
	PostCssScssLib,
	PostCssSelectorParserLib,
	SchematicContextOpts,
	TemplateNode,
	updateContent,
} from '../lib';

// Nx need to see "@angular-devkit/schematics" in order to run this migration correctly (see https://github.com/nrwl/nx/blob/d9fed4b832bf01d1b9a44ae9e486a5e5cd2d2253/packages/nx/src/command-line/migrate/migrate.ts#L1729-L1738)
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('@angular-devkit/schematics');

/**
 * Children of the deprecated `.menu`: specific enough to be renamed wherever they are found.
 */
const CHILDREN: Record<string, string> = {
	'menu-list': 'horizontalNavigation-list',
	// Unstyled, but part of the documented markup
	'menu-list-item': 'horizontalNavigation-list-item',
	'menu-list-item-action': 'horizontalNavigation-list-item-action',
	'menu-link': 'horizontalNavigation-list-item-action',
	'menu-link-placeholder': 'horizontalNavigation-link-placeholder',
	'menu-containerOptional': 'horizontalNavigation-containerOptional',
	// Misspelt class, deleted in 19.3.0
	'menu-containerOptionnal': 'horizontalNavigation-containerOptional',
};

const MENU = 'menu';
const NEW_MENU = 'horizontalNavigation';
const PAGE_HEADER_MOD = 'mod-withMenu';
const NEW_PAGE_HEADER_MOD = 'mod-withHorizontalNavigation';

// Cheap pre-check before parsing: `.menu` or `.mod-withMenu`
const mentionsMenu = (text: string): boolean => /menu/i.test(text);

/**
 * Modifiers of `.menu`: one of them on an element or in a compound selector proves it is the Lucca Front menu.
 */
const MENU_MODS = new Set(['mod-header', 'mod-S', 'mod-vertical', 'mod-noBorder']);

/**
 * lucca-ui (the legacy AngularJS library, derived from Semantic UI) has its own `.lui.menu`, with `.item` children
 * and Semantic UI-like modifiers. It is sometimes vendored inside Angular workspaces: it must never be touched.
 */
const LUCCA_UI_PATH = /lucca-?ui/i;
const LUCCA_UI_CLASSES = new Set([
	'lui',
	'item',
	'vertical',
	'horizontal',
	'dividing',
	'tabbed',
	'pills',
	'right',
	'bordered',
	'inverted',
	'centered',
	'justified',
	'fitting',
]);

/**
 * CSS frameworks shipping a `.menu` (and, for Bulma, a `.menu-list`): the migration cannot tell them apart.
 */
const CONFLICTING_PACKAGES = ['bulma', 'foundation-sites'];

interface ComponentFile {
	inlineTemplates: { position: number; content: string }[];
	templateUrls: string[];
	styleUrls: string[];
}

export default (options?: SchematicContextOpts): Rule => {
	return async (tree, context) => {
		await currentSchematicContext.init(context, options);

		const conflict = conflictingPackage(tree);
		if (conflict) {
			currentSchematicContext.warn(`"${conflict}" is installed and ships its own .menu classes: the menu migration was skipped, migrate it by hand.`);
			return;
		}

		const postCssScss = await import('../lib/local-deps/postcss-scss.js');
		const { postcssSelectorParser } = await import('../lib/local-deps/postcss-selector-parser.js');

		const warnings: string[] = [];
		const stylesWithMenuTemplate = collectStylesWithMenuTemplate(tree);

		// `.menu` and `.pageHeader.mod-withMenu` depend on their context: migrated first, while the children still
		// carry their deprecated names, which prove the context.
		tree.visit((path, entry) => {
			if (path.includes('node_modules') || !entry || LUCCA_UI_PATH.test(path)) {
				return;
			}
			if (path.endsWith('.html')) {
				migrateFile(path, entry, tree, (content) => migrateTemplate(content, path, warnings));
			} else if (path.endsWith('.ts') && !path.endsWith('.d.ts')) {
				migrateFile(path, entry, tree, (content) =>
					applyUpdates(
						content,
						parseComponents(path, content).flatMap((component) =>
							component.inlineTemplates.map((template) => ({
								position: template.position,
								oldContent: template.content,
								newContent: migrateTemplate(template.content, path, warnings),
							})),
						),
					),
				);
			} else if (path.endsWith('.scss')) {
				migrateFile(path, entry, tree, (content) =>
					migrateStylesheet(content, path, stylesWithMenuTemplate.has(path), warnings, postCssScss, postcssSelectorParser),
				);
			}
		});

		// The children are renamed everywhere, including TS string literals
		await new CssMapper(tree, { classes: CHILDREN, variables: {}, mixins: {} }, {}).run();

		if (warnings.length) {
			currentSchematicContext.warn(
				`The following .menu classes were left untouched: they may not be the deprecated Lucca Front menu. Check them and migrate them by hand to .${NEW_MENU} if they are:\n${[...new Set(warnings)].map((w) => `  - ${w}`).join('\n')}`,
			);
		}
	};
};

function conflictingPackage(tree: Tree): string | undefined {
	if (!tree.exists('package.json')) {
		return undefined;
	}
	const { dependencies = {}, devDependencies = {} } = JSON.parse(tree.readText('package.json')) as Record<string, Record<string, string> | undefined>;
	return CONFLICTING_PACKAGES.find((name) => name in dependencies || name in devDependencies);
}

/**
 * Stylesheets of the components whose template holds a Lucca Front menu: a `.menu` they style can only be that menu.
 */
function collectStylesWithMenuTemplate(tree: Tree): Set<string> {
	const styles = new Set<string>();
	tree.visit((path, entry) => {
		if (path.includes('node_modules') || !entry || !path.endsWith('.ts') || path.endsWith('.d.ts')) {
			return;
		}
		for (const component of parseComponents(path, entry.content.toString())) {
			const templates = [
				...component.inlineTemplates.map((template) => template.content),
				...component.templateUrls.map((url) => join(dirname(path), url)).map((templatePath) => (tree.exists(templatePath) ? tree.readText(templatePath) : null)),
			];
			if (templates.some(hasMenuTemplate)) {
				component.styleUrls.forEach((url) => styles.add(join(dirname(path), url)));
			}
		}
	});
	return styles;
}

function parseComponents(path: string, content: string): ComponentFile[] {
	if (!content.includes('@Component')) {
		return [];
	}
	const sourceFile = createSourceFile(path, content, ScriptTarget.ESNext, true);
	const components: ComponentFile[] = [];

	const visit = createVisitor(isDecorator, (decorator) => {
		if (!isCallExpression(decorator.expression) || !isIdentifier(decorator.expression.expression) || decorator.expression.expression.text !== 'Component') {
			return;
		}
		const [argument] = decorator.expression.arguments;
		if (!argument || !isObjectLiteralExpression(argument)) {
			return;
		}
		const component: ComponentFile = { inlineTemplates: [], templateUrls: [], styleUrls: [] };
		const strings = (node: TsNode): string[] => {
			if (isStringLiteral(node) || isNoSubstitutionTemplateLiteral(node)) {
				return [node.text];
			}
			return 'elements' in node ? (node.elements as TsNode[]).flatMap(strings) : [];
		};
		for (const property of argument.properties) {
			if (!isPropertyAssignment(property) || !isIdentifier(property.name)) {
				continue;
			}
			const { initializer } = property;
			switch (property.name.text) {
				case 'template':
					if (isStringLiteral(initializer) || isNoSubstitutionTemplateLiteral(initializer)) {
						// Raw text: positions must match the source, escapes included
						const raw = initializer.getText(sourceFile).slice(1, -1);
						component.inlineTemplates.push({ position: initializer.getStart(sourceFile) + 1, content: raw });
					}
					break;
				case 'templateUrl':
					component.templateUrls.push(...strings(initializer));
					break;
				case 'styleUrl':
				case 'styleUrls':
					component.styleUrls.push(...strings(initializer));
					break;
			}
		}
		components.push(component);
	});

	// `createVisitor` walks the whole tree by itself
	visit(sourceFile);
	return components;
}

function classTokens(element: TmplAstElement): Set<string> {
	const tokens = new Set<string>();
	for (const attribute of element.attributes) {
		if (attribute.name === 'class') {
			attribute.value.split(/\s+/).forEach((token: string) => token && tokens.add(token));
		}
	}
	for (const input of element.inputs) {
		if (input.keySpan.details?.startsWith('class.')) {
			tokens.add(input.name);
		}
	}
	return tokens;
}

/**
 * A `.menu` element is the Lucca Front menu when it carries one of its modifiers, or holds one of its children.
 */
function isMenuElement(element: TmplAstElement): boolean {
	if ([...classTokens(element)].some((token) => MENU_MODS.has(token) || token === NEW_MENU)) {
		return true;
	}
	let hasChild = false;
	new HtmlAstVisitor(element.children as TemplateNode[]).visitElements(/.*/, (child) => {
		hasChild ||= [...classTokens(child)].some((token) => token in CHILDREN);
	});
	return hasChild;
}

function hasMenuTemplate(template: string | null): boolean {
	if (!template?.includes(MENU)) {
		return false;
	}
	let found = false;
	new HtmlAst(template).visitElements(/.*/, (element) => {
		found ||= classTokens(element).has(MENU) && isMenuElement(element);
	});
	return found;
}

function migrateTemplate(content: string, path: string, warnings: string[]): string {
	if (!mentionsMenu(content)) {
		return content;
	}
	return updateContent(content, (updates) => {
		new HtmlAst(content).visitElements(/.*/, (element) => {
			const tokens = classTokens(element);
			const renames: Record<string, string> = {};

			if (tokens.has(MENU)) {
				if (isMenuElement(element)) {
					renames[MENU] = NEW_MENU;
				} else if (![...tokens].some((token) => LUCCA_UI_CLASSES.has(token))) {
					warnings.push(`${path}:${element.sourceSpan.start.line + 1} <${element.name} class="${[...tokens].join(' ')}">`);
				}
			}
			if (tokens.has(PAGE_HEADER_MOD) && tokens.has('pageHeader')) {
				renames[PAGE_HEADER_MOD] = NEW_PAGE_HEADER_MOD;
			}
			// A child already carrying its new class next to the deprecated one: the deprecated one is dropped below
			for (const token of tokens) {
				if (token in CHILDREN && tokens.has(CHILDREN[token])) {
					renames[token] = CHILDREN[token];
				}
			}
			if (!Object.keys(renames).length) {
				return;
			}

			for (const attribute of element.attributes) {
				if (attribute.name === 'class' && attribute.valueSpan) {
					// `menu horizontalNavigation` (both classes, during a transition) must not become `horizontalNavigation horizontalNavigation`
					const seen = new Set<string>();
					const renamed = attribute.value.replace(/(\s*)(\S+)/g, (_: string, space: string, token: string) => {
						const newToken = renames[token] ?? token;
						if (seen.has(newToken)) {
							return '';
						}
						seen.add(newToken);
						return space + newToken;
					});
					updates.push({
						position: attribute.valueSpan.start.offset,
						oldContent: attribute.value,
						newContent: (/^\s*/.exec(attribute.value)?.[0] ?? '') + renamed.trimStart(),
					});
				}
			}
			for (const input of element.inputs) {
				const key = input.keySpan.details;
				if (key?.startsWith('class.') && input.name in renames) {
					updates.push({ position: input.keySpan.start.offset, oldContent: key, newContent: `class.${renames[input.name]}` });
				}
			}
		});
	});
}

function migrateStylesheet(
	content: string,
	path: string,
	isMenuComponentStyle: boolean,
	warnings: string[],
	postCssScss: PostCssScssLib,
	postcssSelectorParser: PostCssSelectorParserLib,
): string {
	if (!mentionsMenu(content)) {
		return content;
	}
	const root = postCssScss.parse(content);
	let changed = false;

	root.walkRules((rule) => {
		// `padding: { … }` nested properties are parsed as rules, with an unparsable selector
		if (rule.selector.endsWith(':') || !mentionsMenu(rule.selector)) {
			return;
		}
		const ast = postcssSelectorParser().astSync(rule.selector);
		let ruleChanged = false;
		// Removed once the walk is over, not while it iterates over them
		const duplicates: ClassName[] = [];

		ast.walkClasses((node) => {
			if (node.value === MENU) {
				if (isLuccaUiSelector(topSelector(node))) {
					return;
				}
				if (isMenuSelector(node, rule, isMenuComponentStyle)) {
					// `.menu.horizontalNavigation` must not become `.horizontalNavigation.horizontalNavigation`
					if (compoundClasses(node).has(NEW_MENU)) {
						duplicates.push(node);
					} else {
						node.value = NEW_MENU;
					}
					ruleChanged = true;
				} else {
					warnings.push(`${path}:${rule.source?.start?.line ?? '?'} ${rule.selector.replace(/\s+/g, ' ')}`);
				}
			} else if (node.value === PAGE_HEADER_MOD && isInPageHeader(node, rule)) {
				// Elsewhere (`.main.mod-withMenu`…), `.mod-withMenu` is another, unrelated modifier
				node.value = NEW_PAGE_HEADER_MOD;
				ruleChanged = true;
			}
		});

		duplicates.forEach((node) => node.remove());
		if (ruleChanged) {
			rule.selector = ast.toString();
			changed = true;
		}
	});

	return changed ? root.toResult({ syntax: { stringify: postCssScss.stringify } }).css : content;
}

/**
 * The complex selector a class belongs to, out of any pseudo-class (`:not(.x)`) it may be nested in.
 */
function topSelector(node: ClassName): Selector {
	let selector = node.parent as Selector;
	while (selector.parent?.type !== 'root' && selector.parent?.parent) {
		selector = selector.parent.parent as Selector;
	}
	return selector;
}

/**
 * lucca-ui selectors: one of its classes anywhere in the selector (`.menu:not(.vertical) > .item`), a `#{$prefix}`
 * interpolation or a `[class*="right menu"]` attribute.
 */
function isLuccaUiSelector(selector: Selector): boolean {
	const text = selector.toString();
	if (text.includes('#{') || text.includes('[class*=')) {
		return true;
	}
	let found = false;
	selector.walkClasses((cls) => {
		found ||= LUCCA_UI_CLASSES.has(cls.value);
	});
	return found;
}

/**
 * Classes of the compound selector a class belongs to (`.a.b.c`, up to the next combinator).
 */
function compoundClasses(node: ClassName): Set<string> {
	const siblings = node.parent?.nodes ?? [];
	const index = siblings.indexOf(node);
	const classes = new Set<string>();
	for (const step of [-1, 1]) {
		for (let i = index; i >= 0 && i < siblings.length && siblings[i].type !== 'combinator'; i += step) {
			if (siblings[i].type === 'class') {
				classes.add(siblings[i].value as string);
			}
		}
	}
	return classes;
}

/**
 * In a stylesheet, `.menu` is the Lucca Front menu when the selector or its nested rules involve its modifiers or
 * children, or when the stylesheet belongs to a component whose template holds that menu.
 */
function isMenuSelector(node: ClassName, rule: CssRule, isMenuComponentStyle: boolean): boolean {
	if ([...compoundClasses(node)].some((cls) => MENU_MODS.has(cls) || cls === NEW_MENU)) {
		return true;
	}
	const selector = topSelector(node).toString();
	const childPattern = new RegExp(`\\.(${Object.keys(CHILDREN).join('|')})(?![\\w-])`);
	if (childPattern.test(selector)) {
		return true;
	}
	let nested = false;
	rule.walkRules((child) => {
		nested ||= childPattern.test(child.selector) || /&\.mod-(header|S|vertical|noBorder)(?![\w-])/.test(child.selector);
	});
	if (nested) {
		return true;
	}
	// `::ng-deep` reaches beyond the component's template: the template no longer proves anything
	return isMenuComponentStyle && !selector.includes('::ng-deep');
}

function isInPageHeader(node: ClassName, rule: CssRule): boolean {
	const compound = compoundClasses(node);
	if (compound.has('pageHeader')) {
		return true;
	}
	// `.pageHeader { &.mod-withMenu { … } }`
	const isNested = node.parent?.nodes.some((sibling) => sibling.type === 'nesting');
	return !!isNested && rule.parent?.type === 'rule' && /\.pageHeader(?![\w-])/.test((rule.parent as CssRule).selector);
}
