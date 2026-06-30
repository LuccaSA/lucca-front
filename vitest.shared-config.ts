import angular from '@analogjs/vite-plugin-angular';
import { join } from 'path';
import type { UserConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig, type Plugin } from 'vitest/config';

process.env['TZ'] = 'UTC';

/**
 * Resolves `describe(Xxx.name, ...)` into `describe('Xxx', ...)` after compilation.
 * This is semantically identical (X.name === 'X') and fixes the Vitest VS Code
 * extension's static test name discovery which cannot evaluate `.name` expressions.
 * See https://github.com/vitest-dev/vscode/issues/638
 *
 * Uses enforce:'post' to run after the Angular compiler plugin which overwrites
 * earlier transforms with its own compiled output.
 */
function resolveTestNameDotName(): Plugin {
	return {
		name: 'resolve-test-name-dot-name',
		transform(code, id) {
			if (!id.includes('.spec.') || !/(describe|it|test)\(\w+\.name\s*,/.test(code)) {
				return undefined;
			}

			return code.replace(/\b(describe|it|test)\((\w+)\.name\s*,/g, (_, fn, name) => `${fn}('${name}',`);
		},
	};
}

export function createBaseConfig(projectRoot: string): UserConfig {
	return defineConfig({
		plugins: [tsconfigPaths({ root: projectRoot }), angular({ tsconfig: join(projectRoot, 'tsconfig.spec.json') }), resolveTestNameDotName()],
		test: {
			watch: false,
			fileParallelism: true,
			isolate: false,
			passWithNoTests: true,
			pool: 'threads',
			globals: true,
			environment: 'happy-dom',
			env: {
				TZ: 'UTC',
			},
			include: ['packages/**/src/**/*.spec.ts', 'packages/**/*.spec.ts', 'stories/**/*.spec.ts'],
			setupFiles: [join(projectRoot, 'vitest.pre-setup.ts'), join(projectRoot, 'vitest.setup.ts')],
			reporters: ['default'],
			coverage: {
				provider: 'v8',
				reportsDirectory: join(projectRoot, 'coverage'),
			},
		},
	});
}
