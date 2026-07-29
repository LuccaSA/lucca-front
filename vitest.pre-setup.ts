/**
 * Pre-setup file that runs BEFORE vitest.setup.ts.
 *
 * Provides browser API mocks with ENUMERABLE prototype methods.
 * This is critical because zone.js uses `for...in` to copy methods
 * when patching classes like MutationObserver. Class syntax methods
 * are non-enumerable, so zone.js's patchClass() cannot find them,
 * resulting in patched instances without observe/disconnect methods.
 */

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

Object.assign(globalThis, {
	MutationObserver: MutationObserverMock,
	ResizeObserver: ResizeObserverMock,
	IntersectionObserver: IntersectionObserverMock,
});
