import { spawnSync } from 'child_process';
import { join } from 'path';

/**
 * Installs the schematics' local runtime dependencies (`postcss`, `postcss-scss`…)
 * exactly once, before any worker spawns.
 *
 * These deps live in `packages/ng/schematics/lib/local-deps/node_modules` (git-ignored)
 * and are loaded at runtime by the migrations. Previously each migration installed them
 * itself via `npm ci`, which is destructive (it wipes `node_modules` before reinstalling).
 * Running it from several specs in parallel raced: one worker deleted `node_modules` while
 * another resolved `postcss-scss`, throwing `MODULE_NOT_FOUND`. Installing once here removes
 * the race; specs pass `skipInstall: true` so the per-migration install never runs.
 */
export default function setup(): void {
	const cwd = join(__dirname, 'packages/ng/schematics/lib/local-deps');
	const result = spawnSync('npm', ['ci'], { cwd, stdio: 'inherit' });
	if (result.status !== 0) {
		throw new Error(`Failed to install schematics local dependencies (npm ci exited with ${result.status})`);
	}
}
