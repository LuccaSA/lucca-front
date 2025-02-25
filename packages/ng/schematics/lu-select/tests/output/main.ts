import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import localeIt from '@angular/common/locales/it';
import localeNl from '@angular/common/locales/nl';
import localePt from '@angular/common/locales/pt';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
	enableProdMode();
}

[localeDe, localeEn, localeEs, localeFr, localeIt, localeNl, localePt]
	.forEach(locale => registerLocaleData(locale));

platformBrowserDynamic().bootstrapModule(AppModule)
	.catch(err => console.error(err));
