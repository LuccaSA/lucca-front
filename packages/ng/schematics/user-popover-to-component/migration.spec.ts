import * as path from 'path';
import { createTreeFromFolder, expectTree, runSchematic } from '../lib/migration-test.js';

const collectionPath = path.normalize(path.join(__dirname, '..', 'migrations.json'));
const testsRoot = path.join(__dirname, 'tests');

describe('lu-icon Migration', () => {
	it('should handle basic case files', async () => {
		// Arrange
		const tree = createTreeFromFolder(path.join(testsRoot, 'input'));
		const expectedTree = createTreeFromFolder(path.join(testsRoot, 'output'));

		// Act
		try {
			await runSchematic('collection', collectionPath, 'user-popover-import', { skipInstallation: true }, tree);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error);
		}

		// Assert
		expectTree(tree).toMatchTree(expectedTree);
	});
});
