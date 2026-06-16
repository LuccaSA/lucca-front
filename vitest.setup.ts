import '@analogjs/vitest-angular/setup-serializers';
import '@analogjs/vitest-angular/setup-snapshots';
import '@analogjs/vitest-angular/setup-zone';
import '@angular/compiler';

import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';
import { TestBed } from '@angular/core/testing';
import '@testing-library/jest-dom/vitest';
import { toHaveNoViolations } from 'jest-axe';
import { afterEach, vi } from 'vitest';

setupTestBed({ zoneless: false });

expect.extend(toHaveNoViolations);

afterEach(() => {
	vi.resetAllMocks();
	TestBed.resetTestingModule();
});

Element.prototype.scrollIntoView = () => {};

const originalError = console.error;
const hideCssParseError = (...args: unknown[]) => {
	if (args[0] && typeof args[0] === 'object' && args[0].constructor.name === 'Error' && args[0]['type'] === 'css parsing') {
		return;
	}
	originalError(...args);
};
console.error = hideCssParseError;
