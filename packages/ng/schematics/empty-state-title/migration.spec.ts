import * as fs from 'fs';
import * as path from 'path';
import { createTreeFromFiles, expectTree, runSchematic } from '../lib/migration-test.js';

const collectionPath = path.normalize(path.join(__dirname, '..', 'migrations.json'));
const testsRoot = path.join(__dirname, 'tests');
const files = fs.readdirSync(testsRoot);

describe('Empty state title migration', () => {
	it('should update files', async () => {
		// Arrange
		const tree = createTreeFromFiles(testsRoot, files, '.input.');
		const expectedTree = createTreeFromFiles(testsRoot, files, '.output.');

		// Act
		try {
			await runSchematic('collection', collectionPath, 'empty-state-heading', { skipInstallation: true }, tree);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error);
		}

		// Assert
		expectTree(tree).toMatchTree(expectedTree);
	});
});
