import { StorybookConfig } from '@storybook/angular-vite';
import autoprefixer from 'autoprefixer';
import { mergeConfig, UserConfig } from 'vite';

import { dirname } from 'path';

import { fileURLToPath } from 'url';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
	return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const config: StorybookConfig = {
	stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [getAbsolutePath('@storybook/addon-a11y'), getAbsolutePath('@storybook/addon-docs'), getAbsolutePath('@storybook/addon-mcp'), getAbsolutePath('@storybook/addon-vitest')],
	framework: {
		name: getAbsolutePath('@storybook/angular-vite'),
		options: {},
	},
	typescript: {
		// The `typescript` package stays on 6.x (Angular's compiler requires it), the docgen reads component types with the TypeScript 7.1 native API.
		docgenSpecifier: '@typescript/native',
	},
	logLevel: process.env['CI'] ? 'error' : 'info',
	staticDirs: ['./public'],
	viteFinal: async (config) => {
		const userConfig: UserConfig = {
			// Mirror the CSS pipeline the published package ships (sass + autoprefixer, see build.js).
			css: {
				transformer: 'postcss',
				postcss: {
					plugins: [autoprefixer()],
				},
			},
			build: {
				cssMinify: 'esbuild',
				rolldownOptions: {
					output: {
						chunkFileNames: '[hash].js',
					},
				},
			},
			resolve: {
				tsconfigPaths: true,
			},
		};
		return mergeConfig(config, userConfig);
	},
};
export default config;
