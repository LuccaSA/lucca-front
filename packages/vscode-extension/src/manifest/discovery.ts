/**
 * Locates the installed @lucca-front/scss package and its manifest for a given
 * workspace folder. Node-only (fs/module) — no 'vscode' import, so unit-testable.
 */

import { createRequire } from 'node:module';
import * as fs from 'node:fs';
import * as path from 'node:path';

import { MANIFEST_RELATIVE_PATH, SCSS_PACKAGE_NAME } from '../constants';

export interface DiscoveryResult {
	/** Directory containing @lucca-front/scss's package.json. */
	packageDir: string;
	/** Version from that package.json (may be '0.0.0' in dev/link setups). */
	libVersion: string;
	/** Absolute manifest path, or undefined when the installed version ships none. */
	manifestPath: string | undefined;
}

/**
 * Resolves @lucca-front/scss starting from `rootDir`, walking up node_modules
 * chains (handles hoisting and pnpm symlinks) and probing a shallow set of
 * monorepo child directories.
 */
export function discoverScssPackage(rootDir: string): DiscoveryResult | undefined {
	for (const dir of candidateDirs(rootDir)) {
		const result = tryResolveFrom(dir);
		if (result) {
			return result;
		}
	}
	return undefined;
}

function tryResolveFrom(dir: string): DiscoveryResult | undefined {
	try {
		const req = createRequire(path.join(dir, 'noop.js'));
		const pkgJsonPath = req.resolve(`${SCSS_PACKAGE_NAME}/package.json`);
		const packageDir = path.dirname(pkgJsonPath);
		const raw = fs.readFileSync(pkgJsonPath, 'utf8');
		const libVersion = (JSON.parse(raw) as { version?: string }).version ?? '0.0.0';
		const manifestPath = path.join(packageDir, MANIFEST_RELATIVE_PATH);
		return {
			packageDir,
			libVersion,
			manifestPath: fs.existsSync(manifestPath) ? manifestPath : undefined,
		};
	} catch {
		return undefined;
	}
}

/**
 * `rootDir` plus direct children under conventional monorepo folders that
 * themselves contain a package.json. Depth-limited on purpose (no recursive
 * node_modules scan).
 */
function candidateDirs(rootDir: string): string[] {
	const dirs = [rootDir];
	for (const sub of ['packages', 'apps', 'libs', 'projects']) {
		const base = path.join(rootDir, sub);
		let children: fs.Dirent[];
		try {
			children = fs.readdirSync(base, { withFileTypes: true });
		} catch {
			continue;
		}
		for (const child of children) {
			if (child.isDirectory() && fs.existsSync(path.join(base, child.name, 'package.json'))) {
				dirs.push(path.join(base, child.name));
			}
		}
	}
	return dirs;
}
