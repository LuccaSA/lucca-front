import { worker } from '../msw/browser';
import { isVitestBrowser } from '../msw/helpers';

export default {
	init() {
		// ---------------------- MSW ----------------------

		// Storybook executes this module in both bootstap phase (Node)
		// and a story's runtime (browser). However, we cannot call `setupWorker`
		// in Node environment, so need to check if we're in a browser.
		if (typeof global.process === 'undefined') {
			// Start the mocking when each story is loaded.
			// Repetitive calls to the `.start()` method do not register a new worker,
			// but check whether there's an existing once, reusing it, if so.

			const pathname = document.location.pathname.slice(0, document.location.pathname.lastIndexOf('/'));
			worker.start({
				serviceWorker: {
					// Points to the custom location of the Service Worker file.
					url: `${pathname}/mockServiceWorker.js`,
					options: {
						// The Service Worker can only claim a scope at or below the
						// directory it is served from. When Storybook is deployed under
						// a subpath (e.g. `/PR-5136/`), a hardcoded `/` scope is rejected.
						scope: `${pathname}/`,
					},
				},
				onUnhandledRequest(request, print) {
					// Same-origin requests are Storybook's own assets, chunks and fonts: let them
					// through silently. Under Vitest, anything external is a real network call, which
					// is what makes the CI run flaky, so it has to be visible; the dev Storybook is
					// expected to reach the CDN and stays quiet.
					if (!isVitestBrowser() || new URL(request.url).origin === location.origin) {
						return;
					}
					print.warning();
				},
			});
		}
	},
};
