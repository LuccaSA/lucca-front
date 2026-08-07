/**
 * Builds and caches `CompletionItem`s from manifest seeds. Two variants are
 * cached per seed array — with and without the deprecation notice/tag — so the
 * experimental toggle costs nothing per keystroke.
 */

import * as vscode from 'vscode';

import { CompletionSeed } from '../manifest/index-model';

export class CompletionItemCache {
	private readonly cache = new WeakMap<readonly CompletionSeed[], { withDep: vscode.CompletionItem[]; withoutDep: vscode.CompletionItem[] }>();

	constructor(
		private readonly kind: vscode.CompletionItemKind,
		private readonly sortPrefix?: string,
	) {}

	items(seeds: readonly CompletionSeed[], showDeprecation: boolean): vscode.CompletionItem[] {
		let entry = this.cache.get(seeds);
		if (!entry) {
			entry = { withDep: this.build(seeds, true), withoutDep: this.build(seeds, false) };
			this.cache.set(seeds, entry);
		}
		return showDeprecation ? entry.withDep : entry.withoutDep;
	}

	private build(seeds: readonly CompletionSeed[], showDeprecation: boolean): vscode.CompletionItem[] {
		return seeds.map((seed) => {
			const item = new vscode.CompletionItem(seed.name, this.kind);
			item.detail = seed.detail;
			item.documentation = new vscode.MarkdownString(showDeprecation ? seed.documentation : seed.documentationNoDep);
			if (this.sortPrefix) {
				item.sortText = `${this.sortPrefix}${seed.name}`;
			}
			if (showDeprecation && seed.deprecated) {
				item.tags = [vscode.CompletionItemTag.Deprecated];
			}
			return item;
		});
	}
}
