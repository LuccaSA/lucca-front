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
