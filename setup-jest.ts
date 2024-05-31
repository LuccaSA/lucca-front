import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';
import 'jest-preset-angular/setup-jest';
import { TextDecoder, TextEncoder } from 'util';

expect.extend(toHaveNoViolations);

Element.prototype.scrollIntoView = () => {};

// @angular-devkit/schematics needs TextDecoder and TextEncoder
// It is used in LF's schematics tests
Object.assign(global, { TextDecoder, TextEncoder });

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// x          Global JEST mocks          x
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
