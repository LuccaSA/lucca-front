module.exports = {
	framework: {
		name: '@storybook/angular',
		options: { fastRefresh: true },
	},
	stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
	staticDirs: ['./public'],
	addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
	core: {
		builder: 'webpack5',
	},
	angularOptions: {
		enableIvy: true,
	},
};
