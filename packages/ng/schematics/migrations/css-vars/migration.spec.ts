import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { migrateFile } from './migration';

const testsRoot = join(__dirname, 'tests');
const files = readdirSync(testsRoot);
const cases = files.filter((f) => f.endsWith('.input.scss')).map((f) => f.replace('.input.scss', ''));

describe('Migration', () => {
	for (const testCase of cases) {
		it('should handle ' + testCase, () => {
			// Arrange
			const input = readFileSync(join(testsRoot, `${testCase}.input.scss`))
				.toString()
				.replace(/\r/g, '');
			const expected = readFileSync(join(testsRoot, `${testCase}.output.scss`))
				.toString()
				.replace(/\r/g, '');

			// Act
			const actual = migrateFile(input);

			//Assert
			expect(stripLastNewLine(actual)).toBe(stripLastNewLine(expected));
		});
	}
});

function stripLastNewLine(input: string): string {
	return input.endsWith('\n') ? input.slice(0, -1) : input;
}
