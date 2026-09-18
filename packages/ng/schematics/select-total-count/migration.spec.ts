import * as path from 'path';
import { createTreeFromFolder, expectTree, runSchematic } from '../lib';

const collectionPath = path.normalize(path.join(__dirname, '..', 'collection.json'));
const testsRoot = path.join(__dirname, 'tests');

describe('select-total-count Migration', () => {
	it('should handle basic case files', async () => {
		// Arrange
		const tree = createTreeFromFolder(path.join(testsRoot, 'input'));
		const expectedTree = createTreeFromFolder(path.join(testsRoot, 'output'));

		// Act
		try {
			await runSchematic('collection', collectionPath, 'select-total-count', { skipInstall: true }, tree);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error);
		}

		// Assert
		expectTree(tree).toMatchTree(expectedTree);
	});

	it('should report placeholders only when detectUnused is on', async () => {
		// Arrange: the schematic is loaded outside the Vite pipeline, so the report is caught on the
		// console rather than on the context module the spec would import.
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

		// Act
		await runSchematic('collection', collectionPath, 'select-total-count', { skipInstall: true, detectUnused: true }, createTreeFromFolder(path.join(testsRoot, 'input')));

		// Assert
		const reported = warn.mock.calls.map(([message]) => message as string);

		expect(reported.filter((message) => message.includes('MyPlaceholderOptionsDirective'))).toHaveLength(1);
		expect(reported.filter((message) => message.includes('MyStaticOptionsDirective'))).toHaveLength(1);
		// Provided to the select-all, real count, and read by the directive itself: all three stay silent.
		expect(reported.filter((message) => message.includes('MyProvidedOptionsDirective'))).toHaveLength(0);
		expect(reported.filter((message) => message.includes('MyRealCountOptionsDirective'))).toHaveLength(0);
		expect(reported.filter((message) => message.includes('MyReadOptionsDirective'))).toHaveLength(0);

		// Arrange
		warn.mockClear();

		// Act
		await runSchematic('collection', collectionPath, 'select-total-count', { skipInstall: true }, createTreeFromFolder(path.join(testsRoot, 'input')));

		// Assert
		expect(warn).not.toHaveBeenCalled();

		warn.mockRestore();
	});
});
