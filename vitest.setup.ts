import '@analogjs/vitest-angular/setup-serializers';
import '@analogjs/vitest-angular/setup-snapshots';
import '@analogjs/vitest-angular/setup-zone';
import '@angular/compiler';

import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';
import '@testing-library/jest-dom/vitest';
import { toHaveNoViolations } from 'jest-axe';
import { afterEach, expect, vi } from 'vitest';

setupTestBed({ zoneless: false });

expect.extend(toHaveNoViolations);

afterEach(() => {
	vi.clearAllMocks();
	vi.restoreAllMocks();
});

// happy-dom doesn't implement scrollIntoView: stub it for unit tests only.
// In vitest browser mode (storybook tests) the native implementation must be kept,
// otherwise scroll-related behaviors can't be tested at all.
if (!('__vitest_browser__' in globalThis)) {
	Element.prototype.scrollIntoView = () => {};

	// Unit tests must never reach the network: a real request outliving its test file makes happy-dom
	// throw once its window is torn down, and the error is reported against whichever file runs next.
	// Mock HTTP calls instead (e.g. provideHttpClient() + provideHttpClientTesting()).
	globalThis.fetch = (input: RequestInfo | URL) => {
		const url = input instanceof Request ? input.url : String(input);
		return Promise.reject(new Error(`Network access is forbidden in unit tests, mock this request: ${url}`));
	};
}

const originalError = console.error;
const hideCssParseError = (...args: unknown[]) => {
	if (args[0] && typeof args[0] === 'object' && args[0].constructor?.name === 'Error' && args[0]['type'] === 'css parsing') {
		return;
	}
	originalError(...args);
};
console.error = hideCssParseError;
