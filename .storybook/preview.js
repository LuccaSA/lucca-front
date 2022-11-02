import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from './documentation.json';

const docToCleanup = [...docJson.components, ...docJson.directives, ...docJson.pipes];

for (const doc of docToCleanup) {
	doc.propertiesClass = [];
	doc.methodsClass = [];
}

setCompodocJson(docJson);

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	docs: {
		// When stories are rendered inside an iframe, controls no longer affect displayed story
		inlineStories: true,
		source: {
			state: 'open',
		},
	},
	backgrounds: {
		default: 'white',
		values: [
			{
				name: 'white',
				value: '#fff',
			},
			{
				name: 'light',
				value: '#F3F5FC',
			},
			{
				name: 'dark',
				value: '#333333',
			},
		],
	},
};

// ---------------------- MSW ----------------------

// Storybook executes this module in both bootstap phase (Node)
// and a story's runtime (browser). However, we cannot call `setupWorker`
// in Node environment, so need to check if we're in a browser.
if (typeof global.process === 'undefined') {
	const { worker } = require('./msw/browser');
	// Start the mocking when each story is loaded.
	// Repetitive calls to the `.start()` method do not register a new worker,
	// but check whether there's an existing once, reusing it, if so.
	worker.start();
}
