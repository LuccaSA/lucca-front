export type FileUpdate = {
	position: number;
	oldContent: string;
	newContent: string;
};

export function applyUpdates(content: string, updates: FileUpdate[]): string {
	if (!updates.length) {
		return content;
	}

	const sortedUpdated = [...updates].sort((u1, u2) => u1.position - u2.position);
	let updatedOffset = 0;

	for (const update of sortedUpdated) {
		const from = update.position + updatedOffset;
		const to = from + update.oldContent.length;
		content = content.slice(0, from) + update.newContent + content.slice(to);
		updatedOffset += update.newContent.length - update.oldContent.length;
	}

	return content;
}
