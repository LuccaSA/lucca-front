import { FileEntry, Tree } from '@angular-devkit/schematics';

export function migrateFile(path: string, entry: Readonly<FileEntry> | null, tree: Tree, updater: (content: string) => string): void {
	if (!entry) {
		return;
	}

	const content = entry.content.toString();

	try {
		const newContent = updater(content);

		if (content !== newContent) {
			tree.overwrite(path, newContent);
		}
	} catch (error) {
		throw error instanceof Error ? new Error(`Failed to migrate ${path}:\n${error.message}`) : error;
	}
}
