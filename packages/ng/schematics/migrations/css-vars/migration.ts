import { Node } from 'postcss';
import type { ValueParser } from 'postcss-value-parser';
import { AngularTemplate } from '../../lib/angular-template';
import { applyUpdates, FileUpdate } from '../../lib/file-update.js';
import { AngularCompilerLib, HtmlAst, updateCssClassNames } from '../../lib/html-ast.js';
import { addForwardRule, commentNode, PostCssLib, PostCssScssLib, removeContainerIfEmpty, removeImportNode, updateDeprecatedVariable } from '../../lib/scss-ast.js';
import { mixinRegistry } from './mixin-registry.js';
import { commentSassFuncWithVar, updateColorMixin } from './updaters/color.js';
import { updateElevation } from './updaters/elevation.js';
import { updateGetSetFunctions } from './updaters/get-set.js';
import { updateIconSizing } from './updaters/icon-sizing.js';
import { removeIE11ThemeSupport } from './updaters/ie11.js';
import { updateMainImport } from './updaters/main-import.js';
import { replaceFuncMixinsWithoutInclude, replaceIncludedMixin } from './updaters/mixins.js';
import { removeScssPlaceholders } from './updaters/remove-scss-placeholder.js';
import { updateThemeMixin } from './updaters/theme.js';
import { addWarnings } from './updaters/warning.js';

export function migrateScssFile(content: string, postCss: PostCssLib, postCssScss: PostCssScssLib, postcssValueParser: ValueParser): string {
	const root = postCssScss.parse(content);

	root.walkAtRules('import', (rule) => {
		['@lucca-front/scss/src/mixins', '@lucca-front/icons/src/mixins', '@lucca-front/scss/src/_mixins', '@lucca-front/icons/src/_mixins', '@lucca-front/scss/src/icons', 'theming'].some((name) =>
			removeImportNode(rule, name, postcssValueParser),
		);
	});

	removeScssPlaceholders(root, postcssValueParser);
	removeIE11ThemeSupport(root, postcssValueParser);
	updateIconSizing(root, postCss, postcssValueParser);
	updateColorMixin(root, postcssValueParser);
	updateThemeMixin(root, postCss, postcssValueParser);
	updateGetSetFunctions(root, postCss, postcssValueParser);
	updateElevation(root, postCss, postcssValueParser);
	updateMainImport(root, postCss, postcssValueParser);
	commentSassFuncWithVar(root, postCss);

	root.walkAtRules('include', (atRule) => {
		if (atRule.params === 'ie11') {
			atRule.remove();
		}
	});

	root.walkDecls('$noCssVar', (node) => {
		node.remove();
	});

	root.walkAtRules('include', (atRule) => {
		if (atRule.params.startsWith('generateCSSVarsFromTheme')) {
			const parent = atRule.parent;
			atRule.remove();
			removeContainerIfEmpty(parent);
		}
	});

	replaceIncludedMixin(root, mixinRegistry, postCss, postcssValueParser);
	replaceFuncMixinsWithoutInclude(root, mixinRegistry, postCss);

	root.walkAtRules('import', (rule) => {
		if (rule.params.includes('@lucca-front/ng/style/components')) {
			commentNode(rule, 'Import non géré par la migration auto.', postCss);
		}
	});

	addWarnings(root);

	updateDeprecatedVariable(
		root,
		{
			'--commons-background-dark': '--commons-background-base',
			'--commons-background-darker': '--commons-background-base',
			'--commons-background-darkest': '--commons-background-base',
		},
		postcssValueParser,
	);

	return root.toResult({ syntax: { stringify: postCssScss.stringify } }).css;
}

export function optimizeScssGlobalImport(content: string, cssImports: string[], postCss: PostCssLib, postCssScss: PostCssScssLib): string {
	const root = postCssScss.parse(content);
	let startImport: Node | null = null;

	root.walkAtRules('forward', (rule) => {
		if (rule.params.includes('@lucca-front/scss/src/main')) {
			startImport = rule;
		}
	});

	if (startImport) {
		for (const cssImport of cssImports) {
			startImport = addForwardRule(root, cssImport, postCss, startImport);
		}
	}

	return root.toResult({ syntax: { stringify: postCssScss.stringify } }).css;
}

const classMigrationMap = {
	'u-fontWeightBold': 'u-fontWeight600',
	'u-order1': 'u-flexOrder1',
	'u-order-1': 'u-flexOrderMinus1',
	'u-right': 'u-floatRight',
	'u-left': 'u-floatLeft',
};

export function migrateHTMLFile(path: string, content: string, angularCompiler: AngularCompilerLib): string {
	return path.endsWith('index.html') ? migrateIndexHTMLFile(content, angularCompiler) : updateCssClassNames(content, classMigrationMap, angularCompiler);
}

export function migrateTsFile(content: string, templates: AngularTemplate[], angularCompiler: AngularCompilerLib): string {
	if (!templates.length) {
		return content;
	}

	const updates: FileUpdate[] = templates.map((tpl) => ({
		position: tpl.offsetStart,
		oldContent: tpl.content,
		newContent: updateCssClassNames(tpl.content, classMigrationMap, angularCompiler),
	}));

	return applyUpdates(content, updates);
}

export function migrateIndexHTMLFile(content: string, angularCompiler: AngularCompilerLib): string {
	const root = new HtmlAst(content, angularCompiler);
	const updates: FileUpdate[] = [];

	root.visitElements('link', (element) => {
		if (element.attributes.some((attr) => attr.name === 'href' && attr.value.includes('Source+Sans+Pro'))) {
			let startOffset = element.sourceSpan.start.offset;

			// Remove all leading tabs/spaces/new-lines
			while (content.slice(startOffset - 1, startOffset).match(/\s/)) {
				startOffset--;
			}

			updates.push({
				position: element.sourceSpan.start.offset,
				oldContent: content.slice(startOffset, element.sourceSpan.end.offset),
				newContent: '',
			});
		}
	});

	return applyUpdates(content, updates);
}

interface AngularJsonFile {
	projects: {
		[projectKey: string]: {
			architect: {
				[architectKey: string]: {
					options?: {
						stylePreprocessorOptions?: {
							includePaths?: string[];
						};
					};
				};
			};
		};
	};
}

export function migrateAngularJsonFile(content: string): string {
	const root = JSON.parse(content) as AngularJsonFile;
	const projectNodes = root?.projects ? Object.keys(root.projects) : [];

	if (!projectNodes?.length) {
		console.error('no projects were found');
		return '';
	}

	for (const projectNode of projectNodes) {
		const project = root.projects[projectNode];
		const architectNodes = project?.architect ? Object.keys(project.architect) : [];

		if (!architectNodes?.length) {
			console.error(`no projects > ${projectNode} > architect were found`);
			return '';
		}

		for (const architectNode of architectNodes) {
			const architect = project.architect[architectNode];
			const options = architect?.options?.stylePreprocessorOptions;

			if (options?.includePaths) {
				options.includePaths = options.includePaths.filter((p) => !p.includes('@lucca-front/'));

				if (!options.includePaths.length) {
					delete architect.options?.stylePreprocessorOptions;
				}
			}
		}
	}

	return JSON.stringify(root, undefined, '\t');
}
