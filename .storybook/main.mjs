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
	addons: [getAbsolutePath('@storybook/addon-a11y'), getAbsolutePath('@storybook/addon-coverage')],
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
					{
						test: /\.mdx?$/,
						use: [
							{
								loader: '@mdx-js/loader',
								options: {},
							},
						],
					},
				],
			},
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
