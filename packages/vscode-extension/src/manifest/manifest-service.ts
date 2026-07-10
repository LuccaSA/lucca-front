/**
 * Owns per-workspace-folder manifest state: discovery, parsing, indexing, and
 * hot-reload. The only stateful vscode-facing piece; providers query it.
 */

import * as fs from 'node:fs';
import * as vscode from 'vscode';

import { buildIndex, ManifestIndex } from './index-model';
import { discoverScssPackage } from './discovery';
import { Manifest } from './types';
import { CONFIG_SECTION, SUPPORTED_MANIFEST_VERSION } from '../constants';

export type FolderState =
	| { kind: 'not-installed' }
	| { kind: 'no-manifest'; libVersion: string }
	| { kind: 'unsupported-version'; libVersion: string; manifestVersion: number }
	| { kind: 'loaded'; libVersion: string; index: ManifestIndex };

export class ManifestService implements vscode.Disposable {
	private readonly states = new Map<string, FolderState>();
	private readonly emitter = new vscode.EventEmitter<void>();
	readonly onDidChange = this.emitter.event;

	/** Loads state for every workspace folder. Safe to call repeatedly. */
	reload(): void {
		this.states.clear();
		const folders = vscode.workspace.workspaceFolders ?? [];
		for (const folder of folders) {
			this.states.set(folder.uri.toString(), this.resolveFolder(folder.uri.fsPath));
		}
		this.emitter.fire();
	}

	private resolveFolder(rootDir: string): FolderState {
		const override = vscode.workspace.getConfiguration(CONFIG_SECTION).get<string>('manifestPath');
		if (override) {
			const loaded = this.tryLoad(override);
			return loaded ? { kind: 'loaded', libVersion: 'override', index: loaded } : { kind: 'not-installed' };
		}

		const discovery = discoverScssPackage(rootDir);
		if (!discovery) {
			return { kind: 'not-installed' };
		}
		if (!discovery.manifestPath) {
			return { kind: 'no-manifest', libVersion: discovery.libVersion };
		}
		const parsed = this.parse(discovery.manifestPath);
		if (!parsed) {
			return { kind: 'no-manifest', libVersion: discovery.libVersion };
		}
		if (parsed.manifestVersion !== SUPPORTED_MANIFEST_VERSION) {
			return { kind: 'unsupported-version', libVersion: discovery.libVersion, manifestVersion: parsed.manifestVersion };
		}
		return { kind: 'loaded', libVersion: discovery.libVersion, index: buildIndex(parsed) };
	}

	private tryLoad(manifestPath: string): ManifestIndex | undefined {
		const parsed = this.parse(manifestPath);
		if (!parsed || parsed.manifestVersion !== SUPPORTED_MANIFEST_VERSION) {
			return undefined;
		}
		return buildIndex(parsed);
	}

	private parse(manifestPath: string): Manifest | undefined {
		try {
			// Read fresh from disk (not require) so upgrades hot-reload.
			return JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as Manifest;
		} catch {
			return undefined;
		}
	}

	/** State for the folder owning `uri`, falling back to a lone loaded folder. */
	getState(uri: vscode.Uri): FolderState {
		const folder = vscode.workspace.getWorkspaceFolder(uri);
		if (folder) {
			return this.states.get(folder.uri.toString()) ?? { kind: 'not-installed' };
		}
		// Document outside any folder (e.g. untitled): if exactly one folder is
		// loaded, use it; otherwise nothing.
		const loaded = [...this.states.values()].filter((s) => s.kind === 'loaded');
		return loaded.length === 1 ? loaded[0] : { kind: 'not-installed' };
	}

	/** Convenience: the index for a document, or undefined unless fully loaded. */
	getIndex(uri: vscode.Uri): ManifestIndex | undefined {
		const state = this.getState(uri);
		return state.kind === 'loaded' ? state.index : undefined;
	}

	/** The installed @lucca-front/scss version for a document, when loaded. */
	getLibVersion(uri: vscode.Uri): string | undefined {
		const state = this.getState(uri);
		return state.kind === 'loaded' ? state.libVersion : undefined;
	}

	/** All folder states, for status/notice decisions. */
	allStates(): FolderState[] {
		return [...this.states.values()];
	}

	dispose(): void {
		this.emitter.dispose();
	}
}
