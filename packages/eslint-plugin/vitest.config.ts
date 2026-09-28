/// <reference types='vitest' />
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		name: 'eslint-plugin',
		globals: true,
		environment: 'node',
		include: ['rules/**/*.test.ts'],
	},
});
