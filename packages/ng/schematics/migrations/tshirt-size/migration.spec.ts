import * as fs from 'fs';
import glob from 'glob';
import * as path from 'path';
import { createTreeFromFiles, expectTree, runMigration } from '../../lib/migration-test.js';

const collectionPath = path.normalize(path.join(__dirname, '..', '../migrations.json'));
const testsRoot = path.join(__dirname, 'tests');
const files = fs.readdirSync(testsRoot);

describe('TShirt Migration', () => {
	it('should update files', async () => {
		// Arrange
		const tree = createTreeFromFiles(testsRoot, files, '.input.');
		const expectedTree = createTreeFromFiles(testsRoot, files, '.output.');

		// Act
		await runMigration(collectionPath, 'migration-v15-tshirt-size', { skipInstallation: true }, tree);

		// Assert
		expectTree(tree).toMatchTree(expectedTree);
	});

	// Use this to migrate @lucca-front/* packages
	it.skip('should migrate @lucca-front/*', async () => {
		// Arrange
		const lfRoot = path.normalize(path.join(__dirname, '..', '..', '..', '..'));
		const lfFiles = [
			...glob.sync('icons/**/*.scss', { cwd: lfRoot, nodir: true }),
			...glob.sync('scss/**/*.scss', { cwd: lfRoot, nodir: true }),
			...glob.sync('ng/**/*', { cwd: lfRoot, nodir: true, ignore: ['**/schematics/**'] }),
		];

		const treeOriginalTree = createTreeFromFiles(lfRoot, lfFiles, '.');
		const tree = createTreeFromFiles(lfRoot, lfFiles, '.');

		// Act
		await runMigration(collectionPath, 'migration-v15-tshirt-size', { skipInstallation: true }, tree);

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
