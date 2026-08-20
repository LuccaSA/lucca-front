import { join } from 'path';
import { register } from 'ts-node';

// The schematics are a standalone CommonJS TS project loaded at runtime by
// @angular-devkit's SchematicTestRunner via native `require`, outside of Vite's
// transform pipeline. Register ts-node so those `require('./index')` calls can
// resolve and compile `.ts` on the fly (this is what jest-preset-angular/ts-jest
// used to do globally).
register({
	project: join(__dirname, 'packages/ng/schematics/tsconfig.json'),
	transpileOnly: true,
	compilerOptions: { module: 'CommonJS', moduleResolution: 'node', ignoreDeprecations: '6.0' },
});

// Mirror the old jest `moduleNameMapper` rule `"^(\\.{1,2}/.*)\\.js$": "$1"`:
// the schematics source uses `.js` extension imports (NodeNext-style) that must
// resolve to the sibling `.ts` under classic node resolution.
const Module = require('module');
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request: string, ...rest: unknown[]) {
	try {
		return originalResolve.call(this, request, ...rest);
	} catch (error) {
		if (/^\.{1,2}\//.test(request) && request.endsWith('.js')) {
			return originalResolve.call(this, request.slice(0, -3), ...rest);
		}
		throw error;
	}
};
