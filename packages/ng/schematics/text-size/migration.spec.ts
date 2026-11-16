import * as path from 'path';
import { createTreeFromFolder, expectTree, runSchematic } from '../lib';

const collectionPath = path.normalize(path.join(__dirname, '..', 'collection.json'));
const testsRoot = path.join(__dirname, 'tests');

describe('text-size Migration', () => {
	it('should replace the deprecated text size utilities and write the report', async () => {
		// Arrange
		const tree = createTreeFromFolder(path.join(testsRoot, 'input'));
		const expectedTree = createTreeFromFolder(path.join(testsRoot, 'output'));

		// Act
		await runSchematic('collection', collectionPath, 'text-size', { skipInstall: true }, tree);

		// Assert
		expectTree(tree).toMatchTree(expectedTree);
	});
});
