/** Hover for pr-u-* / u-* utility classes in HTML and Angular inline templates. */

import * as vscode from 'vscode';

import { getClassAttributeContext } from '../context/class-context';
import { getInlineTemplateRegionAt } from '../context/inline-template';
import { ManifestService } from '../manifest/manifest-service';
import { closestUtilities } from '../manifest/suggestions';
import { unknownUtilityHover, utilityHover } from '../manifest/index-model';
import { propertyDocLinks, renderDocLinks, utilityDocLinks } from '../docs/links';
import { UTILITY_PREFIX } from '../constants';
import { deprecationsEnabled, storybookBaseUrl } from '../settings';

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

		const utility = index.utilities.get(name);
		if (utility) {
			const links = utilityDocLinks(name, storybookBaseUrl(), this.service.getLibVersion(document.uri));
			const markdown = `${utilityHover(name, utility, deprecationsEnabled())}\n\n${renderDocLinks(links)}`;
			return new vscode.Hover(new vscode.MarkdownString(markdown), range);
		}
		// Unknown but pr-u-prefixed: offer close matches (skip bare `u-` to avoid
		// noise on other class systems that happen to start with u-).
		if (name.startsWith(UTILITY_PREFIX)) {
			const suggestions = closestUtilities(name, index.utilityNames);
			const markdown = `${unknownUtilityHover(name, suggestions)}\n\n${renderDocLinks(propertyDocLinks())}`;
			return new vscode.Hover(new vscode.MarkdownString(markdown), range);
		}
		return undefined;
	}
}
