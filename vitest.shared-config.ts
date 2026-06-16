import angular from '@analogjs/vite-plugin-angular';
import { join } from 'path';
import type { UserConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig, type Plugin } from 'vitest/config';

function resolveTestNameDotName(): Plugin {
	return {
		name: 'resolve-test-name-dot-name',
		enforce: 'post',
		transform(code, id) {
			if (!id.includes('.spec.')) return;
			if (!/(describe|it|test)\(\w+\.name\s*,/.test(code)) return;
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
