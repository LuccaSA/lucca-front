import * as path from 'path';
import { createTreeFromFolder, expectTree, runSchematic } from '../lib';

const collectionPath = path.normalize(path.join(__dirname, '..', 'collection.json'));
const testsRoot = path.join(__dirname, 'tests');

describe('lu-label Migration', () => {
	it('should migrate labels and write the report', async () => {
		// Arrange
		const tree = createTreeFromFolder(path.join(testsRoot, 'input'));
		const expectedTree = createTreeFromFolder(path.join(testsRoot, 'output'));

		// Act
		await runSchematic('collection', collectionPath, 'lu-label', { skipInstall: true }, tree);

		// Assert
		expectTree(tree).toMatchTree(expectedTree);
	});

	it('should leave a project without the label CSS untouched', async () => {
		// Arrange
		const tree = createTreeFromFolder(path.join(testsRoot, 'no-label-css', 'input'));
		const expectedTree = createTreeFromFolder(path.join(testsRoot, 'no-label-css', 'output'));

		// Act
		await runSchematic('collection', collectionPath, 'lu-label', { skipInstall: true }, tree);

		// Assert
		expectTree(tree).toMatchTree(expectedTree);
	});
});
