// Setup of the `scenarios` Vitest project, run after the shared setup files.
import './styles.scss';

// Lets a scenario tell this stylesheet from the `main-all` one of the Storybook UI (see `withConsumerStylesheet`).
document.documentElement.setAttribute('data-scenarios-stylesheet', 'consumer');

import { afterEach, beforeEach } from 'vitest';

// A scenario fails on any console.error: Angular reports runtime errors (template errors,
// NG0xxx, errors thrown in subscriptions) through the console and the story would otherwise pass.
const previousConsoleError = console.error;
let consoleErrors: unknown[][] = [];

beforeEach(() => {
	consoleErrors = [];
	console.error = (...args: unknown[]) => {
		consoleErrors.push(args);
		previousConsoleError(...args);
	};
});

afterEach(() => {
	console.error = previousConsoleError;
	if (consoleErrors.length > 0) {
		const messages = consoleErrors.map((args) => args.map((arg) => (arg instanceof Error ? (arg.stack ?? arg.message) : String(arg))).join(' '));
		throw new Error(`console.error was called ${consoleErrors.length} time(s) during the scenario:\n${messages.join('\n')}`);
	}
});
