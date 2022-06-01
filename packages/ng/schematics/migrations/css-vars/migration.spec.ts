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
			const input = readFileSync(join(testsRoot, `${testCase}.input.scss`)).toString();
			const expected = readFileSync(join(testsRoot, `${testCase}.output.scss`)).toString();

			// Act
			const actual = migrateFile(input);

			//Assert
			expect(actual).toBe(expected);
		});
	}
});
