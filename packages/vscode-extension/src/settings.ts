/** Thin accessors over the extension's configuration. */

import * as vscode from 'vscode';

import { CONFIG_DEPRECATIONS, CONFIG_SECTION } from './constants';

/**
 * Whether experimental deprecation detection is enabled. Off by default: the
 * scss package marks CSS deprecations unreliably, so users opt in explicitly.
 */
export function deprecationsEnabled(): boolean {
	return vscode.workspace.getConfiguration(CONFIG_SECTION).get<boolean>(CONFIG_DEPRECATIONS, false);
}

/** Base URL of a Storybook deployment, for per-family utility doc links. Empty = disabled. */
export function storybookBaseUrl(): string {
	return vscode.workspace.getConfiguration(CONFIG_SECTION).get<string>('docs.storybookBaseUrl', '').trim();
}
