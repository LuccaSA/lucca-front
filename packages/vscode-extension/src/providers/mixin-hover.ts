/** Hover for `@include namespace.mixin` references in SCSS. */

import * as vscode from 'vscode';

import { ManifestService } from '../manifest/manifest-service';
import { findImportedNamespaces } from '../context/scss-mixin-context';
import { mixinHover } from '../manifest/index-model';

export class MixinHoverProvider implements vscode.HoverProvider {
	constructor(private readonly service: ManifestService) {}

	provideHover(document: vscode.TextDocument, position: vscode.Position): vscode.Hover | undefined {
		const index = this.service.getIndex(document.uri);
		if (!index || index.mixins.length === 0) {
			return undefined;
		}
		const range = document.getWordRangeAtPosition(position, /[\w-]+\.[\w-]+/);
		if (!range) {
			return undefined;
		}
		const mixin = index.mixinLookup.get(document.getText(range));
		if (!mixin) {
			return undefined;
		}
		const imported = findImportedNamespaces(document.getText()).has(mixin.namespace);
		return new vscode.Hover(new vscode.MarkdownString(mixinHover(mixin, imported)), range);
	}
}
