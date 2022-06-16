import type { ValueParser } from 'postcss-value-parser';
import { updateCssClassNames } from '../../lib/html-ast';
import { PostCssLib, PostCssScssLib, removeContainerIfEmpty, removeImportNode } from '../../lib/scss-ast';
import { mixinRegistry } from './mixin-registry';
import { commentSassFuncWithVar, updateColorMixin } from './updaters/color';
import { updateElevation } from './updaters/elevation';
import { updateGetSetFunctions } from './updaters/get-set';
import { updateIconSizing } from './updaters/icon-sizing';
import { removeIE11ThemeSupport } from './updaters/ie11';
import { updateMainImport } from './updaters/main-import';
import { replaceFuncMixinsWithoutInclude, replaceIncludedMixin } from './updaters/mixins';
import { removeScssPlaceholders } from './updaters/remove-scss-placeholder';
import { updateThemeMixin } from './updaters/theme';

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

export function migrateHTMLFile(content: string): string {
	return updateCssClassNames(content, {
		'u-fontWeightBold': 'u-fontWeight600',
		'u-order1': 'u-flexOrder1',
		'u-order-1': 'u-flexOrderMinus1',
	});
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

			if (architect?.options?.stylePreprocessorOptions?.includePaths) {
				delete architect.options.stylePreprocessorOptions;
			}
		}
	}

	return JSON.stringify(root, undefined, '\t');
}
