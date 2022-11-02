module.exports = {
	stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
	staticDirs: ['./public'],
	addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
	core: {
		builder: 'webpack5',
	},
	angularOptions: {
		enableIvy: true,
	},
};
