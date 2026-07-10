/**
 * Mixin completion for SCSS. Offers `namespace.mixin(…)` after `@include `, and
 * auto-inserts the matching `@use '@lucca-front/scss/…';` when the namespace is
 * not yet imported in the document.
 */

import * as vscode from 'vscode';

import { computeUseInsertion, findImportedNamespaces, getMixinCompletionContext } from '../context/scss-mixin-context';
import { ManifestService } from '../manifest/manifest-service';
import { MixinDef } from '../manifest/types';
import { mixinDocumentation } from '../manifest/index-model';

export class MixinCompletionProvider implements vscode.CompletionItemProvider {
	constructor(private readonly service: ManifestService) {}

	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] | undefined {
		const index = this.service.getIndex(document.uri);
		if (!index || index.mixins.length === 0) {
			return undefined;
		}
		const text = document.getText();
		const offset = document.offsetAt(position);
		const context = getMixinCompletionContext(text, offset);
		if (!context) {
			return undefined;
		}

		const range = new vscode.Range(document.positionAt(context.tokenStart), document.positionAt(context.tokenEnd));
		const imported = findImportedNamespaces(text);
		return index.mixins.map((mixin) => this.toItem(mixin, range, text, imported.has(mixin.namespace), document));
	}

	private toItem(mixin: MixinDef, range: vscode.Range, text: string, isImported: boolean, document: vscode.TextDocument): vscode.CompletionItem {
		const label = `${mixin.namespace}.${mixin.name}`;
		const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Function);
		item.detail = mixin.params ? `(${mixin.params})` : '';
		item.documentation = new vscode.MarkdownString(mixinDocumentation(mixin));
		item.range = range;
		item.insertText = new vscode.SnippetString(mixin.params ? `${label}($0)` : label);
		// Sort own suggestions above VS Code's word-based ones.
		item.sortText = `0_${label}`;

		if (!isImported) {
			const insertion = computeUseInsertion(text, mixin.import);
			item.additionalTextEdits = [vscode.TextEdit.insert(document.positionAt(insertion.offset), insertion.text)];
			item.detail = item.detail ? `${item.detail} · adds @use` : 'adds @use';
		}
		return item;
	}
}
