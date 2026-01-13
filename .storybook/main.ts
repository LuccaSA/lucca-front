import type { StorybookConfig } from '@storybook/angular';

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
	stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [getAbsolutePath('@storybook/addon-a11y'), getAbsolutePath('@storybook/addon-docs')],
	framework: {
		name: '@storybook/angular',
		options: { fastRefresh: !process.env['CI'] },
	},
	logLevel: process.env['CI'] ? 'error' : 'info',
	staticDirs: ['./public'],
};
export default config;
