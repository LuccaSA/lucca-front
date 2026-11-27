import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { startMockApi } from './mock-api';

registerLocaleData(localeFr);

// The mocked API must answer the very first request of the application
startMockApi()
	.then(() => bootstrapApplication(AppComponent, appConfig))
	.catch((error: unknown) => console.error(error));
