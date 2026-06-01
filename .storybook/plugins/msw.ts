import { worker } from '../msw/browser';

export default {
	init() {
		if (typeof global.process === 'undefined' && worker) {
			const pathname = document.location.pathname.slice(0, document.location.pathname.lastIndexOf('/'));
			worker.start({
				serviceWorker: {
					url: `${pathname}/mockServiceWorker.js`,
					options: { scope: '/' },
				},
				onUnhandledRequest: 'bypass',
			});
		}
	},
};
