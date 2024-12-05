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

class ResizeObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
}

Object.assign(global, { ResizeObserver });

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// x          Global JEST mocks          x
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
