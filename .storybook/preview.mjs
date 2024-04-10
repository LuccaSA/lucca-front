import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from './documentation.json';
import DocumentationTemplate from './DocumentationTemplate.mdx';

const docToCleanup = [...docJson.components, ...docJson.directives, ...docJson.pipes];

for (const doc of docToCleanup) {
	doc.propertiesClass = [];
	doc.methodsClass = [];
}

setCompodocJson(docJson);

export const parameters = {
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/
		}
	},
	docs: {
		// When stories are rendered inside an iframe, controls no longer affect displayed story
		inlineStories: true,
		page: DocumentationTemplate,
		canvas: {
			sourceState: 'shown'
		}
	},
	backgrounds: {
		default: 'Default',
		values: [
			{
				name: 'Raised',
				value: '#ffffff'
			},
			{
				name: 'Default',
				value: '#f3f6fc'
			},
			{
				name: 'Sunken',
				value: '#e7edf9'
			},
			{
				name: 'Inverted',
				value: '#0b1732'
			}
		]
	}
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

	const pathname = document.location.pathname.slice(0, document.location.pathname.lastIndexOf('/'));
	worker.start({
		serviceWorker: {
			// Points to the custom location of the Service Worker file.
			url: `${pathname}/mockServiceWorker.js`,
			scope: '/'
		}
	});
}
