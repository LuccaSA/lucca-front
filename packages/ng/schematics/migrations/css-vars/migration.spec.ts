import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as fs from 'fs';
import * as path from 'path';
import * as postCssScss from '../../lib/local-deps/postcss-scss.js';
import { postcssValueParser } from '../../lib/local-deps/postcss-value-parser.js';
import { postCss } from '../../lib/local-deps/postcss.js';
import { migrateAngularJsonFile, migrateHTMLFile, migrateScssFile } from './migration.js';

const collectionPath = path.normalize(path.join(__dirname, '..', '../migrations.json'));

const testsRoot = path.join(__dirname, 'tests');
const files = fs.readdirSync(testsRoot);

describe('SCSS Migration', () => {
	const inputScssFiles = files.filter((f) => f.endsWith('.input.scss'));
	const cases = inputScssFiles.map((f) => f.replace('.input.scss', ''));

	for (const testCase of cases) {
		it('should handle ' + testCase, () => {
			// Arrange
			const input = fs
				.readFileSync(path.join(testsRoot, `${testCase}.input.scss`))
				.toString()
				.replace(/\r/g, '');
			const expected = fs
				.readFileSync(path.join(testsRoot, `${testCase}.output.scss`))
				.toString()
				.replace(/\r/g, '');

			// Act
			const actual = migrateScssFile(input, postCss, postCssScss, postcssValueParser);

			//Assert
			expect(stripLastNewLine(actual)).toBe(stripLastNewLine(expected));
		});
	}
});

describe('HTML Migration', () => {
	const inputHtmlFiles = files.filter((f) => f.endsWith('.input.html'));
	const cases = inputHtmlFiles.map((f) => f.replace('.input.html', ''));

	for (const testCase of cases) {
		it('should handle ' + testCase, async () => {
			// Arrange
			const input = fs
				.readFileSync(path.join(testsRoot, `${testCase}.input.html`))
				.toString()
				.replace(/\r/g, '');
			const expected = fs
				.readFileSync(path.join(testsRoot, `${testCase}.output.html`))
				.toString()
				.replace(/\r/g, '');

			// Act
			const actual = migrateHTMLFile(`${testCase}.html`, input, await import('@angular/compiler'));

			//Assert
			expect(stripLastNewLine(actual)).toBe(stripLastNewLine(expected));
		});
	}
});

describe('Migration Angular JSON file', () => {
	it('should handle angular json file', () => {
		// Arrange
		const input = fs.readFileSync(path.join(testsRoot, `angular.input.json`)).toString().replace(/\r/g, '');
		const expected = fs.readFileSync(path.join(testsRoot, `angular.output.json`)).toString().replace(/\r/g, '');

		// Act
		const actual = migrateAngularJsonFile(input);

		//Assert
		expect(stripLastNewLine(actual)).toBe(stripLastNewLine(expected));
	});
});

describe('CSS Vars Migration', () => {
	it('should update files', async () => {
		const tree = new UnitTestTree(Tree.empty());
		const inputs = files.filter((f) => f.includes('.input.'));
		const outputs = files.filter((f) => f.includes('.output.'));

		for (const file of inputs) {
			tree.create(file.replace('.input.', '.'), fs.readFileSync(path.join(testsRoot, file)).toString().replace(/\r/g, ''));
		}

		const schematicRunner = new SchematicTestRunner('migrations', collectionPath);
		// migration-v10-css-vars is the name of the migration, which is defined in the migration.json file
		await schematicRunner.runSchematicAsync('migration-v10-css-vars', { skipInstallation: true, skipGlobalImportOptimization: true }, tree).toPromise();

		expect(tree.files.length).toBe(inputs.length);

		for (const file of outputs) {
			const filePath = file.replace('.output.', '.');
			expect(tree.exists(filePath)).toBe(true);

			const actualContent = tree.readContent(filePath);
			const expectedContent = fs.readFileSync(path.join(testsRoot, file)).toString().replace(/\r/g, '');

			expect(stripLastNewLine(actualContent)).toBe(stripLastNewLine(expectedContent));
		}
	});

	it('should add optimized global imports', async () => {
		const tree = new UnitTestTree(Tree.empty());
		tree.create(
			'app.component.ts',
			`
			@Component({
				selector: 'clp-root',
				template: \`
					<clp-accessibility-nav></clp-accessibility-nav>
					<lucca-sitemap id="navSide" class="mod-withBanner"></lucca-sitemap>
					<main role="main" class="main-content" id="main-content">
						<router-outlet></router-outlet>
					</main>
					<clf-feature-toggle feature="inbox">
						<clp-documents-satellite enabled></clp-documents-satellite>
					</clf-feature-toggle>
					<clf-toast [sources]="[message$, toastError$]"></clf-toast>
				\`,
			})
			export class AppComponent {}
		`,
		);
		tree.create('app.component.html', '<button type="button" class="button">Test</button>');
		tree.create('table.component.html', '<table class="table mod-sortable" [class.mod-stickyColumn]="true"></table>');
		tree.create('util.component.html', '<div class="u-marginTopStandard">LOL</div>');
		tree.create('styles.scss', "@import '@lucca-front/scss/src/main.overridable';\n@import '@lucca-front/ng/style/main.overridable';");

		const schematicRunner = new SchematicTestRunner('migrations', collectionPath);
		// migration-v10-css-vars is the name of the migration, which is defined in the migration.json file
		await schematicRunner.runSchematicAsync('migration-v10-css-vars', { skipInstallation: true }, tree).toPromise();

		const expectedImports = [
			`@forward '@lucca-front/icons/src/main';`,
			`@forward '@lucca-front/scss/src/main';`,
			`@forward '@lucca-front/scss/src/components/button';`,
			`@forward '@lucca-front/scss/src/components/main';`,
			`@forward '@lucca-front/scss/src/components/navside';`,
			`@forward '@lucca-front/scss/src/components/table';`,
			`@forward '@lucca-front/scss/src/components/tableSorted';`,
			`@forward '@lucca-front/scss/src/components/tableSticked';`,
			`@forward '@lucca-front/scss/src/components/util';`,
			`@forward '@lucca-front/ng/src/main';`,
		];

		expect(tree.readContent('styles.scss')).toBe(expectedImports.join('\n'));
	});
});

function stripLastNewLine(input: string): string {
	return input.endsWith('\n') ? input.slice(0, -1) : input;
}
