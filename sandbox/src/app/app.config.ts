import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import fr from '@angular/common/locales/fr';
import { routes } from './app.routes';

registerLocaleData(fr);

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), { provide: LOCALE_ID, useValue: 'fr' }],
};
