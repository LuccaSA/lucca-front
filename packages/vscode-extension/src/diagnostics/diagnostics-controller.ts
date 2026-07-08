/** Wires the pure analyzer to VS Code diagnostics with debouncing + settings. */

import * as vscode from 'vscode';

import { analyze, Finding } from './analyzer';
import { CONFIG_SECTION, CSS_LANGUAGES, DIAGNOSTIC_SOURCE, MARKUP_LANGUAGES } from '../constants';
import { ManifestIndex } from '../manifest/index-model';
import { ManifestService } from '../manifest/manifest-service';
import { closestUtilities } from '../manifest/suggestions';
import { deprecationsEnabled } from '../settings';

const DEBOUNCE_MS = 300;
const SUPPORTED = new Set([...CSS_LANGUAGES, ...MARKUP_LANGUAGES]);

export class DiagnosticsController implements vscode.Disposable {
	private readonly collection = vscode.languages.createDiagnosticCollection(DIAGNOSTIC_SOURCE);
	private readonly timers = new Map<string, NodeJS.Timeout>();
	private readonly disposables: vscode.Disposable[] = [];

	constructor(private readonly service: ManifestService) {
		this.disposables.push(
			vscode.workspace.onDidOpenTextDocument((doc) => this.schedule(doc)),
			vscode.workspace.onDidChangeTextDocument((e) => this.schedule(e.document)),
			vscode.workspace.onDidCloseTextDocument((doc) => this.clear(doc)),
		);
		this.refreshAll();
	}

	/** Re-run for all open documents (e.g. after a manifest reload or config change). */
	refreshAll(): void {
		for (const doc of vscode.workspace.textDocuments) {
			this.run(doc);
		}
	}

	private schedule(doc: vscode.TextDocument): void {
		if (!SUPPORTED.has(doc.languageId)) {
			return;
		}
		const key = doc.uri.toString();
		const existing = this.timers.get(key);
		if (existing) {
			clearTimeout(existing);
		}
		this.timers.set(
			key,
			setTimeout(() => {
				this.timers.delete(key);
				this.run(doc);
			}, DEBOUNCE_MS),
		);
	}

	private run(doc: vscode.TextDocument): void {
		if (!SUPPORTED.has(doc.languageId)) {
			return;
		}
		const config = vscode.workspace.getConfiguration(CONFIG_SECTION);
		if (!config.get<boolean>('diagnostics.enabled', true)) {
			this.collection.delete(doc.uri);
			return;
		}
		const index = this.service.getIndex(doc.uri);
		if (!index) {
			this.collection.delete(doc.uri);
			return;
		}

		const deprecatedSeverity = toSeverity(config.get<string>('diagnostics.deprecatedSeverity', 'warning'));
		const unknownSeverity = toSeverity(config.get<string>('diagnostics.unknownClassSeverity', 'warning'));
		const findings = analyze(doc.getText(), doc.languageId, index, { deprecations: deprecationsEnabled() });
		this.collection.set(
			doc.uri,
			findings.map((f) => this.toDiagnostic(doc, f, index, deprecatedSeverity, unknownSeverity)),
		);
	}

	private toDiagnostic(doc: vscode.TextDocument, finding: Finding, index: ManifestIndex, deprecatedSeverity: vscode.DiagnosticSeverity, unknownSeverity: vscode.DiagnosticSeverity): vscode.Diagnostic {
		const range = new vscode.Range(doc.positionAt(finding.startOffset), doc.positionAt(finding.endOffset));
		let message: string;
		let severity: vscode.DiagnosticSeverity;
		const tags: vscode.DiagnosticTag[] = [];

		if (finding.kind === 'unknown-class') {
			const [suggestion] = closestUtilities(finding.name, index.utilityNames, 1);
			const hint = suggestion ? ` Did you mean \`${suggestion}\`?` : ' Check the spelling, or upgrade the package.';
			message = `\`${finding.name}\` is not a utility class in the installed @lucca-front/scss.${hint}`;
			severity = unknownSeverity;
		} else if (finding.kind === 'deprecated-class') {
			const replacement = finding.replacement ? ` Use \`${finding.replacement}\` instead.` : '';
			message = `\`${finding.name}\` is deprecated.${replacement}${finding.note ? ` ${finding.note}` : ''}`;
			severity = deprecatedSeverity;
			tags.push(vscode.DiagnosticTag.Deprecated);
		} else {
			message = `\`${finding.name}\` is deprecated.${finding.note ? ` ${finding.note}` : ''}`;
			severity = deprecatedSeverity;
			tags.push(vscode.DiagnosticTag.Deprecated);
		}

		const diagnostic = new vscode.Diagnostic(range, message, severity);
		diagnostic.source = DIAGNOSTIC_SOURCE;
		diagnostic.code = finding.kind;
		if (tags.length) {
			diagnostic.tags = tags;
		}
		return diagnostic;
	}

	private clear(doc: vscode.TextDocument): void {
		const key = doc.uri.toString();
		const timer = this.timers.get(key);
		if (timer) {
			clearTimeout(timer);
			this.timers.delete(key);
		}
		this.collection.delete(doc.uri);
	}

	dispose(): void {
		for (const timer of this.timers.values()) {
			clearTimeout(timer);
		}
		this.timers.clear();
		this.collection.dispose();
		this.disposables.forEach((d) => d.dispose());
	}
}

function toSeverity(value: string | undefined): vscode.DiagnosticSeverity {
	switch (value) {
		case 'error':
			return vscode.DiagnosticSeverity.Error;
		case 'information':
			return vscode.DiagnosticSeverity.Information;
		case 'hint':
			return vscode.DiagnosticSeverity.Hint;
		default:
			return vscode.DiagnosticSeverity.Warning;
	}
}
