import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import { TextDecoder, TextEncoder } from 'util';

setupZoneTestEnv();

expect.extend(toHaveNoViolations);

Element.prototype.scrollIntoView = () => {};

// @angular-devkit/schematics needs TextDecoder and TextEncoder
// It is used in LF's schematics tests
Object.assign(global, { TextDecoder, TextEncoder });

const originalError = console.error;
const hideCssParseError = (...args: unknown[]) => {
	if (args[0] && typeof args[0] === 'object' && args[0].constructor.name === 'Error' && args[0]['type'] === 'css parsing') {
		// JSDOM doesn't support CSS @layer rules and throws verbose errors
		return;
	} else {
		originalError(...args);
	}
};

console.error = hideCssParseError;

class ResizeObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
}

class IntersectionObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
}

class MutationObserver {
	observe() {}
	disconnect() {}
	takeRecords() {
		return [];
	}
}

Object.assign(global, { ResizeObserver, IntersectionObserver, MutationObserver });

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// x          Global JEST mocks          x
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
