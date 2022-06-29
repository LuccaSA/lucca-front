import type { ValueParser } from 'postcss-value-parser';
import { AngularCompilerLib, updateCssClassNames } from '../../lib/html-ast.js';
import { addForwardRule, PostCssLib, PostCssScssLib, removeContainerIfEmpty, removeImportNode } from '../../lib/scss-ast.js';
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

export function migrateScssFile(content: string, postCss: PostCssLib, postCssScss: PostCssScssLib, postcssValueParser: ValueParser): string {
	const root = postCssScss.parse(content);

	root.walkAtRules('import', (rule) => {
		['@lucca-front/scss/src/mixins', '@lucca-front/icons/src/mixins', '@lucca-front/scss/src/icons', 'theming'].some((name) => removeImportNode(rule, name, postcssValueParser));
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

	return root.toResult({ syntax: { stringify: postCssScss.stringify } }).css;
}

export function optimizeScssGlobalImport(content: string, cssImports: string[], postCss: PostCssLib, postCssScss: PostCssScssLib, postcssValueParser: ValueParser): string {
	const root = postCssScss.parse(content);
	let hasGlobalImport = false;

	root.walkAtRules('forward', (rule) => {
		if (rule.params.includes('@lucca-front/scss/src/components')) {
			removeImportNode(rule, '@lucca-front/scss/src/components', postcssValueParser);
			hasGlobalImport = true;
		}
	});

	if (hasGlobalImport) {
		for (const cssImport of cssImports) {
			addForwardRule(root, cssImport, postCss);
		}
	}

	return root.toResult({ syntax: { stringify: postCssScss.stringify } }).css;
}

export function migrateHTMLFile(content: string, angularCompiler: AngularCompilerLib): string {
	return updateCssClassNames(
		content,
		{
			'u-fontWeightBold': 'u-fontWeight600',
			'u-order1': 'u-flexOrder1',
			'u-order-1': 'u-flexOrderMinus1',
		},
		angularCompiler,
	);
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
				options.includePaths = options.includePaths.filter((p) => !p.startsWith('@lucca-front/'));

				if (!options.includePaths.length) {
					delete architect.options?.stylePreprocessorOptions;
				}
			}
		}
	}

	return JSON.stringify(root, undefined, '\t');
}
