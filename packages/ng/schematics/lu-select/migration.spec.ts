import * as fs from 'fs';
import * as path from 'path';
import { createTreeFromFiles, expectTree, runSchematic } from '../lib/migration-test.js';

const collectionPath = path.normalize(path.join(__dirname, '..', 'collection.json'));
const testsRoot = path.join(__dirname, 'tests');
const files = fs.readdirSync(testsRoot);

describe('lu-select Migration', () => {
	it('should handle basic case files', async () => {
		// Arrange
		const tree = createTreeFromFiles(testsRoot, files, '.input.');
		const expectedTree = createTreeFromFiles(testsRoot, files, '.output.');

		// Act
		try {
			await runSchematic('collection', collectionPath, 'lu-select', { skipInstallation: true }, tree);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error);
		}

		// Assert
		expectTree(tree).toMatchTree(expectedTree);
	});
});
