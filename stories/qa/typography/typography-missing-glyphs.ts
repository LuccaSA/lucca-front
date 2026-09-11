const MISSING_GLYPH_CLASS = 'qa-missingGlyph';

export const missingGlyphStyles = `
	.${MISSING_GLYPH_CLASS} {
		background-color: var(--palettes-critical-50);
		color: var(--palettes-critical-700);
	}
`;

export interface HighlightMissingCharactersOptions {
	highlightAncestorSelector?: string;
}

export function runAfterViewInit(root: HTMLElement, work: (root: HTMLElement) => void): void {
	const ready = root.querySelector('#ready');
	ready?.remove();
	work(root);
	void document.fonts.ready.then(() => {
		if (ready) {
			root.append(ready);
		}
	});
}

export function highlightMissingCharacters(root: HTMLElement, selector: string, missing: ReadonlySet<string>, options?: HighlightMissingCharactersOptions): void {
	const paragraphs = [...root.querySelectorAll<HTMLElement>(selector)];

	paragraphs.forEach((paragraph) => {
		const characters = Array.from(paragraph.textContent ?? '');

		const children: (Node | string)[] = [];
		let textBuffer = '';
		let hasMissingGlyph = false;

		for (const character of characters) {
			if (missing.has(character)) {
				hasMissingGlyph = true;
				if (textBuffer) {
					children.push(textBuffer);
					textBuffer = '';
				}
				const span = document.createElement('span');
				span.textContent = character;
				span.classList.add(MISSING_GLYPH_CLASS);
				children.push(span);
			} else {
				textBuffer += character;
			}
		}
		if (textBuffer) {
			children.push(textBuffer);
		}

		paragraph.replaceChildren(...children);

		if (hasMissingGlyph && options?.highlightAncestorSelector) {
			paragraph.closest(options.highlightAncestorSelector)?.classList.add(MISSING_GLYPH_CLASS);
		}
	});
}
