/** Unit tests for the pure logic layer (no 'vscode' imports). */
module.exports = {
	testEnvironment: 'node',
	testMatch: ['**/*.test.ts'],
	rootDir: '.',
	transform: {
		'^.+\\.ts$': [
			'ts-jest',
			{
				tsconfig: {
					target: 'ES2022',
					module: 'CommonJS',
					esModuleInterop: true,
					strict: true,
					skipLibCheck: true,
				},
			},
		],
	},
};
