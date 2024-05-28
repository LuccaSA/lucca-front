import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import { createTreeFromFiles, expectTree, runSchematic } from '../lib/migration-test.js';

const collectionPath = path.normalize(path.join(__dirname, '..', 'collection.json'));
const testsRoot = path.join(__dirname, 'tests');
const files = fs.readdirSync(testsRoot);

describe('Palettes Migration', () => {
	it('should update files', async () => {
		// Arrange
		const tree = createTreeFromFiles(testsRoot, files, '.input.');
		const expectedTree = createTreeFromFiles(testsRoot, files, '.output.');

		// Act
		try {
			await runSchematic('collection', collectionPath, 'palettes', { skipInstallation: true }, tree);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error);
		}

		// Assert
		expectTree(tree).toMatchTree(expectedTree);
	});
	// Use this to migrate @lucca-front/* packages
	it.skip('should migrate @lucca-front/*', async () => {
		// Arrange
		const lfRoot = path.normalize(path.join(__dirname, '..', '..', '..', '..'));
		const lfFiles = [
			...glob.sync('packages/icons/**/*.scss', { cwd: lfRoot, nodir: true }),
			...glob.sync('packages/scss/**/*.scss', { cwd: lfRoot, nodir: true }),
			...glob.sync('packages/ng/**/*', { cwd: lfRoot, nodir: true, ignore: ['**/schematics/**'] }),
			...glob.sync('stories/**', { cwd: lfRoot, nodir: true }),
		];

		const treeOriginalTree = createTreeFromFiles(lfRoot, lfFiles, '.');
		const tree = createTreeFromFiles(lfRoot, lfFiles, '.');

		// Act
		await runSchematic('collection', collectionPath, 'palettes', { skipInstallation: true }, tree);

		// Assert
		tree.visit((p, entry) => {
			const original = treeOriginalTree.get(p)?.content.toString() || '';
			const updated = entry?.content.toString() || '';

			if (original !== updated) {
				const fromRootPath = path.join(lfRoot, p);
				fs.writeFileSync(fromRootPath, updated);
			}
		});
	});
});
