/** Custom-property completion for CSS/SCSS/LESS. */

import * as vscode from 'vscode';

import { CompletionSeed } from '../manifest/index-model';
import { getCssCompletionContext } from '../context/css-context';
import { ManifestService } from '../manifest/manifest-service';

export class CssCompletionProvider implements vscode.CompletionItemProvider {
	/** Cache built CompletionItems per index identity to avoid per-keystroke work. */
	private cache = new WeakMap<readonly CompletionSeed[], vscode.CompletionItem[]>();

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
		const items = this.itemsFor(index.propertyCompletions);
		// Reuse cached items but stamp the replace range for this invocation.
		for (const item of items) {
			item.range = range;
		}
		return items;
	}

	private itemsFor(seeds: readonly CompletionSeed[]): vscode.CompletionItem[] {
		let items = this.cache.get(seeds);
		if (!items) {
			items = seeds.map((seed) => {
				const item = new vscode.CompletionItem(seed.name, vscode.CompletionItemKind.Variable);
				item.detail = seed.detail;
				item.documentation = new vscode.MarkdownString(seed.documentation);
				// Sort own suggestions above VS Code's file-scanned var suggestions.
				item.sortText = `0_${seed.name}`;
				if (seed.deprecated) {
					item.tags = [vscode.CompletionItemTag.Deprecated];
				}
				return item;
			});
			this.cache.set(seeds, items);
		}
		return items;
	}
}
