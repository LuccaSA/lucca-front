/// <reference types="vitest" />
import { mergeConfig } from 'vitest/config';

import { createBaseConfig } from './vitest.shared-config';

export default mergeConfig(createBaseConfig(__dirname), {
	root: __dirname,
	cacheDir: './node_modules/.vite',
	test: {
		name: 'lucca-front',
		include: ['packages/**/*.spec.ts', 'packages/**/*.spec.*.ts', 'stories/**/*.spec.ts'],
		exclude: ['**/node_modules/**', '**/schematics/**/*.spec.ts'],
	},
});
