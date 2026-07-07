/** Hover for pr-u-* / u-* utility classes in HTML and Angular inline templates. */

import * as vscode from 'vscode';

import { getClassAttributeContext } from '../context/class-context';
import { getInlineTemplateRegionAt } from '../context/inline-template';
import { ManifestService } from '../manifest/manifest-service';
import { utilityHover } from '../manifest/index-model';

export class ClassHoverProvider implements vscode.HoverProvider {
	constructor(private readonly service: ManifestService) {}

	provideHover(document: vscode.TextDocument, position: vscode.Position): vscode.Hover | undefined {
		const index = this.service.getIndex(document.uri);
		if (!index) {
			return undefined;
		}
		const range = document.getWordRangeAtPosition(position, /(?:pr-)?u-[\w-]+/);
		if (!range) {
			return undefined;
		}
		const name = document.getText(range);
		const utility = index.utilities.get(name);
		if (!utility) {
			return undefined;
		}

		// Verify the hovered token really sits inside a class attribute (not prose).
		const text = document.getText();
		const offset = document.offsetAt(range.start);
		let chunkOffset = 0;
		let chunk = text;
		if (document.languageId === 'typescript') {
			const region = getInlineTemplateRegionAt(text, offset);
			if (!region) {
				return undefined;
			}
			chunkOffset = region.start;
			chunk = text.slice(region.start, region.end);
		}
		// Probe from just after the token start so the attribute scan sees it.
		if (!getClassAttributeContext(chunk, offset - chunkOffset + 1)) {
			return undefined;
		}

		return new vscode.Hover(new vscode.MarkdownString(utilityHover(name, utility)), range);
	}
}
