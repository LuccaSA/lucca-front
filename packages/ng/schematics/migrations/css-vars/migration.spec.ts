import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import * as fs from 'fs';
import * as path from 'path';
import { migrateAngularJsonFile, migrateFile } from './migration';

const collectionPath = path.normalize(path.join(__dirname, '..', '../migrations.json'));

const testsRoot = path.join(__dirname, 'tests');
const files = fs.readdirSync(testsRoot);
const inputFiles = files.filter((f) => f.endsWith('.input.scss'));
const outputFiles = files.filter((f) => f.endsWith('.output.scss'));
const cases = inputFiles.map((f) => f.replace('.input.scss', ''));

describe('Migration', () => {
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
			const actual = migrateFile(input);

			//Assert
			expect(stripLastNewLine(actual)).toBe(stripLastNewLine(expected));
		});
	}
});

describe('Migration Angular JSON file', () => {
	it('should handle angular json file', () => {
		// Arrange
		const input = fs
			.readFileSync(path.join(testsRoot, `angular.input.json`))
			.toString()
			.replace(/\r/g, '');
		const expected = fs
			.readFileSync(path.join(testsRoot, `angular.output.json`))
			.toString()
			.replace(/\r/g, '');

		// Act
		const actual = migrateAngularJsonFile(input);

		//Assert
		expect(stripLastNewLine(actual)).toBe(stripLastNewLine(expected));
	});
});

describe('CSS Vars Migration', () => {
	it('should update style files', async () => {
		const tree = new UnitTestTree(Tree.empty());

		for (const file of inputFiles) {
			tree.create(file.replace('.input.', '.'), fs.readFileSync(path.join(testsRoot, file)).toString().replace(/\r/g, ''));
		}

		const schematicRunner = new SchematicTestRunner('migrations', collectionPath);
		// migration-v9-css-vars is the name of the migration, which is defined in the migration.json file
		await schematicRunner.runSchematicAsync('migration-v9-css-vars', {}, tree).toPromise();

		expect(tree.files.length).toBe(inputFiles.length);

		for (const file of outputFiles) {
			const filePath = file.replace('.output.', '.');
			expect(tree.exists(filePath)).toBe(true);

			const actualContent = tree.readContent(filePath);
			const expectedContent = fs.readFileSync(path.join(testsRoot, file)).toString().replace(/\r/g, '');

			expect(stripLastNewLine(actualContent)).toBe(stripLastNewLine(expectedContent));
		}
	});
});

function stripLastNewLine(input: string): string {
	return input.endsWith('\n') ? input.slice(0, -1) : input;
}
