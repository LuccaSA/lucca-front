import { URL, fileURLToPath } from 'url';

export default {
	framework: {
		name: '@storybook/angular',
		options: { fastRefresh: true },
	},
	docs: {
		autodocs: true, // see below for alternatives
	},
	stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
	features: { buildStoriesJson: true },
	staticDirs: ['./public'],
	addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
	webpackFinal: (config) => ({
		...config,
		resolve: {
			...config.resolve,
			alias: {
				...config.resolve.alias,
				'@storybook/blocks': fileURLToPath(new URL('../node_modules/@storybook/blocks', import.meta.url)),
			},
		},
	}),
};
