import { StorybookConfig } from '@analogjs/storybook-angular';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import { UserConfig, mergeConfig } from 'vite';

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
	addons: [getAbsolutePath('@storybook/addon-a11y'), getAbsolutePath('@storybook/addon-docs'), getAbsolutePath('@storybook/addon-mcp')],
	framework: {
		name: '@analogjs/storybook-angular',
		options: {},
	},
	logLevel: process.env['CI'] ? 'error' : 'info',
	staticDirs: ['./public'],
	viteFinal: async (config: UserConfig) => {
		return mergeConfig(config, {
			plugins: [viteTsConfigPaths()],
		});
	},
};
export default config;
