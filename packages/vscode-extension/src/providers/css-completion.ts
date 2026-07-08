/** Custom-property completion for CSS/SCSS/LESS. */

import * as vscode from 'vscode';

import { CompletionItemCache } from './completion-items';
import { getCssCompletionContext } from '../context/css-context';
import { ManifestService } from '../manifest/manifest-service';
import { deprecationsEnabled } from '../settings';

export class CssCompletionProvider implements vscode.CompletionItemProvider {
	// Sort own suggestions above VS Code's file-scanned var suggestions.
	private readonly cache = new CompletionItemCache(vscode.CompletionItemKind.Variable, '0_');

	constructor(private readonly service: ManifestService) {}

	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] | undefined {
		const index = this.service.getIndex(document.uri);
		if (!index) {
			return undefined;
		}
		const offset = document.offsetAt(position);
		const context = getCssCompletionContext(document.getText(), offset);
		if (!context) {
			return undefined;
		}

		const range = new vscode.Range(document.positionAt(context.tokenStart), document.positionAt(context.tokenEnd));
		const items = this.cache.items(index.propertyCompletions, deprecationsEnabled());
		// Reuse cached items but stamp the replace range for this invocation.
		for (const item of items) {
			item.range = range;
		}
		return items;
	}
}
