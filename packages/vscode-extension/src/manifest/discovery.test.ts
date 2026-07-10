import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import { discoverScssPackage } from './discovery';

let tmp: string;

function makePackage(dir: string, version: string, withManifest: boolean) {
	const pkgDir = path.join(dir, 'node_modules', '@lucca-front', 'scss');
	fs.mkdirSync(pkgDir, { recursive: true });
	fs.writeFileSync(path.join(pkgDir, 'package.json'), JSON.stringify({ name: '@lucca-front/scss', version }));
	if (withManifest) {
		const apiDir = path.join(pkgDir, 'css-api');
		fs.mkdirSync(apiDir, { recursive: true });
		fs.writeFileSync(path.join(apiDir, 'manifest.json'), '{"manifestVersion":1,"package":"@lucca-front/scss","variables":{},"utilities":{}}');
	}
}

beforeEach(() => {
	tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lf-discovery-'));
});

afterEach(() => {
	fs.rmSync(tmp, { recursive: true, force: true });
});

describe('discoverScssPackage', () => {
	it('finds a hoisted install with a manifest', () => {
		makePackage(tmp, '20.3.1', true);
		const result = discoverScssPackage(tmp);
		expect(result?.libVersion).toBe('20.3.1');
		expect(result?.manifestPath).toBeDefined();
	});

	it('reports an installed package without a manifest', () => {
		makePackage(tmp, '18.0.0', false);
		const result = discoverScssPackage(tmp);
		expect(result?.libVersion).toBe('18.0.0');
		expect(result?.manifestPath).toBeUndefined();
	});

	it('finds the package in a monorepo child package', () => {
		const child = path.join(tmp, 'packages', 'app');
		fs.mkdirSync(child, { recursive: true });
		fs.writeFileSync(path.join(child, 'package.json'), JSON.stringify({ name: 'app' }));
		makePackage(child, '21.0.0', true);
		const result = discoverScssPackage(tmp);
		expect(result?.libVersion).toBe('21.0.0');
	});

	it('returns undefined when not installed', () => {
		expect(discoverScssPackage(tmp)).toBeUndefined();
	});
});
