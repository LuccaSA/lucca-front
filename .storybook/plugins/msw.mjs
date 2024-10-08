export default {
	init() {
		// ---------------------- MSW ----------------------

		// Storybook executes this module in both bootstap phase (Node)
		// and a story's runtime (browser). However, we cannot call `setupWorker`
		// in Node environment, so need to check if we're in a browser.
		if (typeof global.process === 'undefined') {
			const { worker } = require('../msw/browser');
			// Start the mocking when each story is loaded.
			// Repetitive calls to the `.start()` method do not register a new worker,
			// but check whether there's an existing once, reusing it, if so.

			const pathname = document.location.pathname.slice(0, document.location.pathname.lastIndexOf('/'));
			worker.start({
				serviceWorker: {
					// Points to the custom location of the Service Worker file.
					url: `${pathname}/mockServiceWorker.js`,
					scope: '/',
				},
			});
		}
	},
};
