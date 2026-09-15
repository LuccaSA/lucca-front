import { describe, expect, it } from 'vitest';
import { collectImportStatements } from './story-source';

/**
 * Imports used to be collected line by line, so prettier wrapping a long specifier list published
 * the bare `import {` as if it were the whole statement — 13 syntactically invalid ```js blocks on
 * the 22.0 skill, and always the component's own package, since that is the longest line.
 */
describe('collectImportStatements', () => {
	it('keeps a single-line import as it is', () => {
		expect(collectImportStatements("import { ButtonComponent } from '@lucca-front/ng/button';\n")).toEqual(["import { ButtonComponent } from '@lucca-front/ng/button';"]);
	});

	it('re-joins an import prettier wrapped over several lines, trailing comma and all', () => {
		const source = ['import {', '\tDataTableCellComponent,', '\tDataTableComponent,', '\tDataTableHeaderComponent,', "} from '@lucca-front/ng/data-table';", ''].join('\n');

		expect(collectImportStatements(source)).toEqual(["import { DataTableCellComponent, DataTableComponent, DataTableHeaderComponent } from '@lucca-front/ng/data-table';"]);
	});

	it('collects the imports that follow a wrapped one', () => {
		const source = ['import {', "\tA,\n} from '@lucca-front/ng/a';", "import { B } from '@lucca-front/ng/b';", ''].join('\n');

		expect(collectImportStatements(source)).toEqual(["import { A } from '@lucca-front/ng/a';", "import { B } from '@lucca-front/ng/b';"]);
	});

	it('keeps side-effect and namespace imports', () => {
		expect(collectImportStatements("import './polyfills';\nimport * as ns from 'rxjs';\n")).toEqual(["import './polyfills';", "import * as ns from 'rxjs';"]);
	});

	it('ignores dynamic imports and import.meta', () => {
		expect(collectImportStatements("const m = await import('./lazy');\nconst u = import.meta.url;\n")).toEqual([]);
	});

	it('does not run past the end of the file on an unterminated statement', () => {
		expect(collectImportStatements('import {\n\tA,\n\tB,\n')).toEqual(['import { A, B,']);
	});
});
