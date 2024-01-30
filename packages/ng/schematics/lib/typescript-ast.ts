import { SourceFile, forEachChild, isNoSubstitutionTemplateLiteral, isStringLiteral } from 'typescript';
import { createVisitor, orGuard } from './angular-template';
import { FileUpdate } from './file-update';

export function replaceStringLiterals(sourcefile: SourceFile, oldStringToNewString: Record<string, string>): FileUpdate[] {
	const updates: FileUpdate[] = [];

	forEachChild(
		sourcefile,
		createVisitor(orGuard(isStringLiteral, isNoSubstitutionTemplateLiteral), (node) => {
			const parts = getStringTokens(node.text).map((part) => ({
				...part,
				text: part.text in oldStringToNewString ? oldStringToNewString[part.text] : part.text,
			}));

			const newText = parts.reduce((acc, p) => acc + p.text + (p.separator || ''), '');

			if (newText !== node.text) {
				const position = node.pos + node.getLeadingTriviaWidth(sourcefile) /* Spaces before the single/double quote */ + 1; /* Single or double quote before the string content */
				updates.push({
					position,
					oldContent: node.text,
					newContent: newText,
				});
			}
		}),
	);

	return updates;
}

function getStringTokens(newText: string): { separator?: string; text: string }[] {
	const parts: { separator?: string; text: string }[] = [];

	let indexOfSeparator: number | null = null;

	do {
		indexOfSeparator = newText.match(/\.| /)?.index ?? null;

		if (indexOfSeparator === null) {
			parts.push({ text: newText });
			break;
		}

		parts.push({
			separator: newText[indexOfSeparator],
			text: newText.slice(0, indexOfSeparator),
		});

		newText = newText.slice(indexOfSeparator + 1);
	} while (indexOfSeparator !== null);

	return parts;
}
