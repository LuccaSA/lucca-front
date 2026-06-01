import type { StorybookConfig } from '@storybook/angular-vite';

import { dirname } from 'path';

import { fileURLToPath } from 'url';

function getAbsolutePath(value: string): any {
	return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
const config: StorybookConfig = {
	stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [getAbsolutePath('@storybook/addon-a11y'), getAbsolutePath('@storybook/addon-docs'), getAbsolutePath('@storybook/addon-mcp')],
	framework: {
		name: '@storybook/angular-vite',
		options: { compodoc: false },
	},
	logLevel: process.env['CI'] ? 'error' : 'info',
	staticDirs: ['./public'],
	viteFinal: (config) => {
		config.resolve = { ...config.resolve, tsconfigPaths: true };
		config.build = {
			...config.build,
			rolldownOptions: {
				...((config.build as any)?.rolldownOptions ?? {}),
				output: {
					...((config.build as any)?.rolldownOptions?.output ?? {}),
					chunkFileNames: 'assets/[hash].js',
					assetFileNames: 'assets/[hash][extname]',
				},
			},
		};
		return config;
	},
};
export default config;
