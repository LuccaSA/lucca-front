import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootNodeModules = resolve(__dirname, '../../node_modules');

export default {
	testEnvironment: 'node',
	testMatch: ['**/*.test.ts'],
	rootDir: '.',
	transform: {
		'^.+\\.ts$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.json',
				useESM: true,
			},
		],
	},
	extensionsToTreatAsEsm: ['.ts'],
	moduleNameMapper: {
		'^@typescript-eslint/rule-tester$': `${rootNodeModules}/@typescript-eslint/rule-tester/dist/index.js`,
		'^@typescript-eslint/parser$': `${rootNodeModules}/@typescript-eslint/parser/dist/index.js`,
		'^@typescript-eslint/utils$': `${rootNodeModules}/@typescript-eslint/utils/dist/index.js`,
		'^@typescript-eslint/utils/eslint-utils$': `${rootNodeModules}/@typescript-eslint/utils/dist/eslint-utils/index.js`,
	},
};
