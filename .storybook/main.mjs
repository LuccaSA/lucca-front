import { dirname, join } from 'path';
import { fileURLToPath, URL } from 'url';
import { createRequire } from 'module';

export default {
	framework: {
		name: '@storybook/angular',
		options: { fastRefresh: true },
	},
	docs: {
		autodocs: true,
	},
	stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)', '../**/*.mdx'],
	features: { buildStoriesJson: true },
	staticDirs: ['./public'],
	addons: ['@storybook/addon-a11y', '@storybook/addon-coverage', '@storybook/addon-docs'],
	webpackFinal: (config) => {
		return {
			...config,
			module: {
				...(config.module || {}),
				rules: [
					...(config.module.rules || []),
					{
						test: /\.(js|ts)$/,
						loader: '@jsdevtools/coverage-istanbul-loader',
						enforce: 'post',
						include: fileURLToPath(new URL('../', import.meta.url)),
						exclude: [/\.(e2e|spec)\.ts$/, /node_modules/, /(ngfactory|ngstyle)\.js/, /polyfills.ts/],
					},
				],
			},
		};
	},
};
