import { parse, stringify } from 'postcss-scss';
import { mixinRegistry } from './mixin-registry';
import { commentSassFuncWithVar, updateColorMixin } from './updaters/color';
import { updateElevation } from './updaters/elevation';
import { updateGetSetFunctions } from './updaters/get-set';
import { updateIconSizing } from './updaters/icon-sizing';
import { removeIE11ThemeSupport } from './updaters/ie11';
import { updateMainImport } from './updaters/main-import';
import { replaceIncludedMixin, replaceFuncMixinsWithoutInclude } from './updaters/mixins';
import { removeScssPlaceholders } from './updaters/remove-scss-placeholder';
import { updateThemeMixin } from './updaters/theme';
import { removeContainerIfEmpty, removeImportNode } from './utils';

export function migrateFile(content: string): string {
	const root = parse(content);

	root.walkAtRules('import', (rule) => {
		['@lucca-front/scss/src/mixins', '@lucca-front/icons/src/mixins', '@lucca-front/scss/src/icons', 'theming'].some((name) => removeImportNode(rule, name));
	});

	removeScssPlaceholders(root);
	removeIE11ThemeSupport(root);
	updateIconSizing(root);
	updateColorMixin(root);
	updateThemeMixin(root);
	updateGetSetFunctions(root);
	updateElevation(root);
	updateMainImport(root);
	commentSassFuncWithVar(root);

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

	replaceIncludedMixin(root, mixinRegistry);
	replaceFuncMixinsWithoutInclude(root, mixinRegistry);

	return root.toResult({ syntax: { stringify } }).css;
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
