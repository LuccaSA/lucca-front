/**
 * Pre-setup file that runs BEFORE vitest.setup.ts.
 *
 * Provides browser API mocks with ENUMERABLE prototype methods.
 * This is critical because zone.js uses `for...in` to copy methods
 * when patching classes like MutationObserver. Class syntax methods
 * are non-enumerable, so zone.js's patchClass() cannot find them,
 * resulting in patched instances without observe/disconnect methods.
 */

// Vitest's browser mode runs against a real Chromium, which implements the observers for real.
// They still have to be re-declared with enumerable methods for zone.js, but as delegates rather
// than no-ops: inert observers there would silently disable every behaviour driven by them
// (ellipsis tooltips, resize-driven layouts…) while the stories kept passing.
const isBrowserMode = typeof (globalThis as { __vitest_browser_runner__?: unknown }).__vitest_browser_runner__ !== 'undefined';

function MutationObserverMock(this: any, _callback?: MutationCallback) {
	this._callback = _callback;
}
MutationObserverMock.prototype.observe = function () {};
MutationObserverMock.prototype.disconnect = function () {};
MutationObserverMock.prototype.takeRecords = function () {
	return [];
};

function ResizeObserverMock(this: any, _callback?: ResizeObserverCallback) {
	this._callback = _callback;
}
ResizeObserverMock.prototype.observe = function () {};
ResizeObserverMock.prototype.unobserve = function () {};
ResizeObserverMock.prototype.disconnect = function () {};

function IntersectionObserverMock(this: any, _callback?: IntersectionObserverCallback) {
	this._callback = _callback;
}
IntersectionObserverMock.prototype.observe = function () {};
IntersectionObserverMock.prototype.unobserve = function () {};
IntersectionObserverMock.prototype.disconnect = function () {};

type ObserverMethods = Record<string, (...args: never[]) => unknown>;

/** Same enumerable-prototype shape as the mocks above, but forwarding to the real implementation. */
function createDelegatingObserver(NativeObserver: new (...args: never[]) => ObserverMethods, methods: string[]) {
	function DelegatingObserver(this: { _native: ObserverMethods }, ...args: never[]) {
		this._native = new NativeObserver(...args);
	}
	const prototype = DelegatingObserver.prototype as ObserverMethods;
	for (const method of methods) {
		prototype[method] = function (this: { _native: ObserverMethods }, ...args: never[]) {
			return this._native[method](...args);
		};
	}
	return DelegatingObserver;
}

if (isBrowserMode) {
	// `ResizeObserver` is left untouched: zone.js does not patch it, so the native class is safe.
	Object.assign(globalThis, {
		MutationObserver: createDelegatingObserver(MutationObserver as unknown as new (...args: never[]) => ObserverMethods, ['observe', 'disconnect', 'takeRecords']),
		IntersectionObserver: createDelegatingObserver(IntersectionObserver as unknown as new (...args: never[]) => ObserverMethods, ['observe', 'unobserve', 'disconnect', 'takeRecords']),
	});
} else {
	Object.assign(globalThis, {
		MutationObserver: MutationObserverMock,
		ResizeObserver: ResizeObserverMock,
		IntersectionObserver: IntersectionObserverMock,
	});
}
