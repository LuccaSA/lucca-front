import * as path from 'path';
import { createTreeFromFolder, expectTree, runSchematic } from '../lib';

const collectionPath = path.normalize(path.join(__dirname, '..', 'collection.json'));
const testsRoot = path.join(__dirname, 'tests');

describe('no-value Migration', () => {
	it('should replace the dashes of empty Lucca Front table cells', async () => {
		// Arrange
		const tree = createTreeFromFolder(path.join(testsRoot, 'input'));
		const expectedTree = createTreeFromFolder(path.join(testsRoot, 'output'));

		// Act
		await runSchematic('collection', collectionPath, 'no-value', { skipInstall: true }, tree);

		// Assert
		expectTree(tree).toMatchTree(expectedTree);
	});

	it('should report the fallback dashes of expressions it cannot migrate', async () => {
		// Arrange
		const tree = createTreeFromFolder(path.join(testsRoot, 'input'));
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

		// Act
		await runSchematic('collection', collectionPath, 'no-value', { skipInstall: true }, tree);

		// Assert
		expect(warn).toHaveBeenCalledTimes(1);
		expect(warn).toHaveBeenCalledWith(expect.stringContaining("/inline-template.component.ts:26 — {{ manager ?? '–' }}"));
		warn.mockRestore();
	});
});
