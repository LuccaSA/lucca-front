/** Hover for custom properties in CSS/SCSS/LESS. */

import * as vscode from 'vscode';

import { ManifestService } from '../manifest/manifest-service';
import { propertyHover } from '../manifest/index-model';
import { deprecationsEnabled } from '../settings';

export class CssHoverProvider implements vscode.HoverProvider {
	constructor(private readonly service: ManifestService) {}

	provideHover(document: vscode.TextDocument, position: vscode.Position): vscode.Hover | undefined {
		const index = this.service.getIndex(document.uri);
		if (!index) {
			return undefined;
		}
		const range = document.getWordRangeAtPosition(position, /--[\w-]+/);
		if (!range) {
			return undefined;
		}
		const name = document.getText(range);
		const prop = index.properties.get(name);
		if (!prop) {
			return undefined;
		}
		return new vscode.Hover(new vscode.MarkdownString(propertyHover(name, prop, deprecationsEnabled())), range);
	}
}
