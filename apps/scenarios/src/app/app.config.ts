import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { configureLuDialog, provideDialogRoutingReuseStrategy } from '@lucca-front/ng/dialog';
import { provideLuModal } from '@lucca-front/ng/modal';
import { routes } from './app.routes';

/**
 * Root providers, written the way most consuming applications write them: zone.js change detection,
 * the select responsive dialog left to its `false` default, a French locale.
 */
export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(
			routes,
			withComponentInputBinding(),
			// A routed dialog guarded by `canDeactivate` can cancel a back navigation. With the default `replace`,
			// the router rewrites the history entry it came back to, and the next back skips the page under the dialog.
			withRouterConfig({ canceledNavigationResolution: 'computed' }),
		),
		provideDialogRoutingReuseStrategy(),
		provideHttpClient(),
		configureLuDialog(),
		provideLuModal(),
		{ provide: LOCALE_ID, useValue: 'fr-FR' },
	],
};
