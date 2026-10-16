/**
 * Whether the page runs on Apple platforms, whose modifiers differ (Option, Command)
 */
export function isMacPlatform(): boolean {
	return typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent);
}
