import { dirname, join } from 'path';
import { fileURLToPath, URL } from 'url';
import { createRequire } from 'module';

export default {
	framework: {
		name: getAbsolutePath('@storybook/angular'),
		options: { fastRefresh: true },
	},
	docs: {
		autodocs: true, // see below for alternatives
	},
	stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)', '../stories/**/*.mdx'],
	features: { buildStoriesJson: true },
	staticDirs: ['./public'],
	addons: [
		getAbsolutePath('@storybook/addon-essentials'),
		getAbsolutePath('@storybook/addon-a11y'),
		getAbsolutePath('@storybook/addon-interactions'),
	],
	webpackFinal: (config) => {
		const { module } = config;
		const { rules } = module;
		const customRules = [
			...rules,
			{
				test: /\.mdx?$/,
				use: [
					{
						loader: '@mdx-js/loader',
						options: {},
					},
				],
			},
		];
		return {
			...config,
			module: { ...config.module, rules: customRules },
			resolve: {
				...config.resolve,
				alias: {
					...config.resolve.alias,
					// '@storybook/blocks': fileURLToPath(new URL('../node_modules/@storybook/blocks', import.meta.url)),
					'@storybook/docs-tools': fileURLToPath(new URL('../node_modules/@storybook/docs-tools', import.meta.url)),
				},
			},
		};
	},
};

function getAbsolutePath(value) {
	const require = createRequire(import.meta.url);
	return dirname(require.resolve(join(value, 'package.json')));
}
