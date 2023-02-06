module.exports = {
	framework: {
		name: '@storybook/angular',
		options: { fastRefresh: true },
	},
	docs: {
		autodocs: true, // see below for alternatives
	},
	stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
	staticDirs: ['./public'],
	addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
};
