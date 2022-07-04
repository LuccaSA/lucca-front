import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';
import 'jest-preset-angular/setup-jest';

expect.extend(toHaveNoViolations);

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// x          Global JEST mocks          x
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
