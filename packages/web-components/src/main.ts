import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import localeIt from '@angular/common/locales/it';
import localeNl from '@angular/common/locales/nl';
import localePl from '@angular/common/locales/pl';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, Type } from '@angular/core';
import { createApplication } from '@angular/platform-browser';
import { DateInputComponent } from '@lucca-front/ng/date2';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { defineElement } from './define-element';

/**
 * Components rendered by Angular at runtime, keyed by the name used in `window.Prisme`.
 * CSS-only components are not exposed: prototypes use their HTML markup, as in production.
 */
const ELEMENTS: Record<string, { tagName: string; component: Type<unknown> }> = {
	DateInput: { tagName: 'lu-date-input', component: DateInputComponent },
	SimpleSelect: { tagName: 'lu-simple-select', component: LuSimpleSelectInputComponent },
};

declare global {
	interface Window {
		Prisme: Record<string, string>;
	}
}

// Declared by build.js around the bundle
declare const PRISME_VERSION: string;

[localeDe, localeEn, localeEs, localeFr, localeIt, localeNl, localePt, localePl].forEach((locale) => registerLocaleData(locale));

createApplication({
	// Translations and formats follow the page language, like the brand font does
	providers: [{ provide: LOCALE_ID, useFactory: () => document.documentElement.lang || 'fr-FR' }],
})
	.then(({ injector }) => {
		window.Prisme = { version: PRISME_VERSION };
		for (const [name, { tagName, component }] of Object.entries(ELEMENTS)) {
			if (!customElements.get(tagName)) {
				defineElement(tagName, component, injector);
			}
			window.Prisme[name] = tagName;
		}
	})
	.catch((error: unknown) => console.error(error));
