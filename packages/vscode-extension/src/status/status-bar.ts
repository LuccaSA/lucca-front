/** Status-bar item + one-time "no manifest" notice. */

import * as vscode from 'vscode';

import { COMMAND_RELOAD } from '../constants';
import { FolderState, ManifestService } from '../manifest/manifest-service';

const DISMISSED_KEY = 'luccaFront.noManifestNoticeDismissed';

export class StatusBar implements vscode.Disposable {
	private readonly item: vscode.StatusBarItem;

	constructor(
		private readonly service: ManifestService,
		private readonly memento: vscode.Memento,
	) {
		this.item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 0);
		this.item.command = COMMAND_RELOAD;
	}

	update(): void {
		const states = this.service.allStates();
		const loaded = states.find((s): s is Extract<FolderState, { kind: 'loaded' }> => s.kind === 'loaded');
		const noManifest = states.find((s): s is Extract<FolderState, { kind: 'no-manifest' }> => s.kind === 'no-manifest');
		const unsupported = states.find((s): s is Extract<FolderState, { kind: 'unsupported-version' }> => s.kind === 'unsupported-version');

		if (loaded) {
			this.item.text = `$(symbol-color) LF ${loaded.libVersion}`;
			this.item.tooltip = `Lucca Front IntelliSense — @lucca-front/scss ${loaded.libVersion}\n${loaded.index.variableCount} custom properties, ${loaded.index.utilityCount} utility classes`;
			this.item.show();
			return;
		}
		if (unsupported) {
			this.item.text = '$(warning) LF: update extension';
			this.item.tooltip = `@lucca-front/scss ${unsupported.libVersion} ships manifest v${unsupported.manifestVersion}, newer than this extension supports. Update the extension.`;
			this.item.show();
			return;
		}
		if (noManifest) {
			this.item.text = '$(warning) LF: no manifest';
			this.item.tooltip = `@lucca-front/scss ${noManifest.libVersion} is installed but ships no IntelliSense manifest.`;
			this.item.show();
			this.maybeNotify(noManifest.libVersion);
			return;
		}
		// not-installed: stay silent.
		this.item.hide();
	}

	private maybeNotify(libVersion: string): void {
		if (this.memento.get<boolean>(DISMISSED_KEY)) {
			return;
		}
		void vscode.window
			.showInformationMessage(
				`@lucca-front/scss ${libVersion} is installed but ships no IntelliSense manifest. Upgrade to a newer version to enable completions, hovers and diagnostics.`,
				"Don't show again",
			)
			.then((choice) => {
				if (choice === "Don't show again") {
					void this.memento.update(DISMISSED_KEY, true);
				}
			});
	}

	dispose(): void {
		this.item.dispose();
	}
}
