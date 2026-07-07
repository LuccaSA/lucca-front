/** Utility-class completion for HTML and Angular inline templates. */

import * as vscode from 'vscode';

import { CompletionSeed } from '../manifest/index-model';
import { getClassAttributeContext } from '../context/class-context';
import { getInlineTemplateRegionAt } from '../context/inline-template';
import { ManifestService } from '../manifest/manifest-service';
import { UTILITY_PREFIX } from '../constants';

export class ClassCompletionProvider implements vscode.CompletionItemProvider {
	private cache = new WeakMap<readonly CompletionSeed[], vscode.CompletionItem[]>();

	constructor(private readonly service: ManifestService) {}

	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] | undefined {
		const index = this.service.getIndex(document.uri);
		if (!index) {
			return undefined;
		}
		const text = document.getText();
		const offset = document.offsetAt(position);

		// Determine the text chunk + local offset to inspect for a class attribute.
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

		const context = getClassAttributeContext(chunk, offset - chunkOffset);
		if (!context) {
			return undefined;
		}
		// Stay out of other class systems: only engage for empty or pr-u- tokens.
		if (context.token.length > 0 && !UTILITY_PREFIX.startsWith(context.token) && !context.token.startsWith(UTILITY_PREFIX)) {
			return undefined;
		}

		const range = new vscode.Range(document.positionAt(chunkOffset + context.tokenStart), document.positionAt(chunkOffset + context.tokenEnd));
		const items = this.itemsFor(index.utilityCompletions);
		for (const item of items) {
			item.range = range;
		}
		return items;
	}

	private itemsFor(seeds: readonly CompletionSeed[]): vscode.CompletionItem[] {
		let items = this.cache.get(seeds);
		if (!items) {
			items = seeds.map((seed) => {
				const item = new vscode.CompletionItem(seed.name, vscode.CompletionItemKind.Value);
				item.detail = seed.detail;
				item.documentation = new vscode.MarkdownString(seed.documentation);
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
