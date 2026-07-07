/** Extension entry point — wiring only. */

import * as vscode from 'vscode';

import { ClassCompletionProvider } from './providers/class-completion';
import { ClassHoverProvider } from './providers/class-hover';
import { CssCompletionProvider } from './providers/css-completion';
import { CssHoverProvider } from './providers/css-hover';
import { DiagnosticsController } from './diagnostics/diagnostics-controller';
import { ManifestService } from './manifest/manifest-service';
import { StatusBar } from './status/status-bar';
import { COMMAND_RELOAD, CONFIG_SECTION, CSS_LANGUAGES, MARKUP_LANGUAGES } from './constants';

const RELOAD_DEBOUNCE_MS = 500;

export function activate(context: vscode.ExtensionContext): void {
	const service = new ManifestService();
	const statusBar = new StatusBar(service, context.globalState);
	const diagnostics = new DiagnosticsController(service);

	context.subscriptions.push(service, statusBar, diagnostics);

	const refresh = (): void => {
		statusBar.update();
		diagnostics.refreshAll();
	};
	context.subscriptions.push(service.onDidChange(refresh));

	// Providers.
	const cssCompletion = new CssCompletionProvider(service);
	const classCompletion = new ClassCompletionProvider(service);
	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider(CSS_LANGUAGES, cssCompletion, '-', '('),
		vscode.languages.registerCompletionItemProvider(MARKUP_LANGUAGES, classCompletion, '"', "'", ' ', '-'),
		vscode.languages.registerHoverProvider(CSS_LANGUAGES, new CssHoverProvider(service)),
		vscode.languages.registerHoverProvider(MARKUP_LANGUAGES, new ClassHoverProvider(service)),
	);

	// Reload command.
	context.subscriptions.push(vscode.commands.registerCommand(COMMAND_RELOAD, () => service.reload()));

	// Reload triggers (debounced).
	let reloadTimer: NodeJS.Timeout | undefined;
	const scheduleReload = (): void => {
		if (reloadTimer) {
			clearTimeout(reloadTimer);
		}
		reloadTimer = setTimeout(() => service.reload(), RELOAD_DEBOUNCE_MS);
	};

	const scssWatcher = vscode.workspace.createFileSystemWatcher('**/node_modules/@lucca-front/scss/**/{package.json,manifest.json}');
	const lockWatcher = vscode.workspace.createFileSystemWatcher('**/{package-lock.json,yarn.lock,pnpm-lock.yaml}');
	for (const watcher of [scssWatcher, lockWatcher]) {
		context.subscriptions.push(watcher, watcher.onDidChange(scheduleReload), watcher.onDidCreate(scheduleReload), watcher.onDidDelete(scheduleReload));
	}
	context.subscriptions.push(
		vscode.workspace.onDidChangeWorkspaceFolders(scheduleReload),
		vscode.workspace.onDidChangeConfiguration((e) => {
			if (e.affectsConfiguration(CONFIG_SECTION)) {
				service.reload();
			}
		}),
	);

	// Initial load.
	service.reload();
}

export function deactivate(): void {
	// Disposables are handled via context.subscriptions.
}
