/**
 * Quick Fix code actions for our diagnostics: replace an unknown pr-u-* class
 * with a close match, or a deprecated class with its recommended replacement.
 * Reachable via the standard Quick Fix menu (Ctrl+. / Cmd+.).
 */

import * as vscode from 'vscode';

import { DIAGNOSTIC_SOURCE } from '../constants';
import { ManifestService } from '../manifest/manifest-service';
import { closestUtilities } from '../manifest/suggestions';

export class QuickFixProvider implements vscode.CodeActionProvider {
	static readonly kinds = [vscode.CodeActionKind.QuickFix];

	constructor(private readonly service: ManifestService) {}

	provideCodeActions(document: vscode.TextDocument, _range: vscode.Range | vscode.Selection, context: vscode.CodeActionContext): vscode.CodeAction[] {
		const index = this.service.getIndex(document.uri);
		if (!index) {
			return [];
		}
		const actions: vscode.CodeAction[] = [];
		for (const diagnostic of context.diagnostics) {
			if (diagnostic.source !== DIAGNOSTIC_SOURCE) {
				continue;
			}
			const name = document.getText(diagnostic.range);
			const replacements = this.replacementsFor(diagnostic.code, name, index.utilities.get(name)?.replacement, index.utilityNames);
			replacements.forEach((replacement, i) => {
				actions.push(this.makeFix(document, diagnostic, name, replacement, i === 0));
			});
		}
		return actions;
	}

	private replacementsFor(code: unknown, name: string, knownReplacement: string | undefined, utilityNames: readonly string[]): string[] {
		if (code === 'deprecated-class') {
			return knownReplacement ? [knownReplacement] : [];
		}
		if (code === 'unknown-class') {
			return closestUtilities(name, utilityNames);
		}
		return []; // deprecated-property has no replacement in the manifest
	}

	private makeFix(document: vscode.TextDocument, diagnostic: vscode.Diagnostic, from: string, to: string, preferred: boolean): vscode.CodeAction {
		const action = new vscode.CodeAction(`Replace '${from}' with '${to}'`, vscode.CodeActionKind.QuickFix);
		action.edit = new vscode.WorkspaceEdit();
		action.edit.replace(document.uri, diagnostic.range, to);
		action.diagnostics = [diagnostic];
		action.isPreferred = preferred;
		return action;
	}
}
