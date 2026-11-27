import { setupWorker } from 'msw/browser';
import { harvestPlanningHandlers } from './app/harvest-planning/harvest-planning.handlers';

/**
 * The API of the scenario pages is mocked by a service worker (MSW): the application still sends its
 * requests through `HttpClient` and the network, only the answers are fake. A request to `/api/` that
 * no handler answers is reported as a console error, which fails the e2e tests.
 */
export async function startMockApi(): Promise<void> {
	await setupWorker(...harvestPlanningHandlers).start({
		quiet: true,
		onUnhandledRequest: (request, print) => {
			if (new URL(request.url).pathname.startsWith('/api/')) {
				print.error();
			}
		},
	});
}
