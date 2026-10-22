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
import { LuSkipLinksComponent } from '@lucca-front/ng/a11y';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { EmptyStatePageComponent, EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { FileEntryComponent, MultiFileUploadComponent, SingleFileUploadComponent } from '@lucca-front/ng/file-upload';
import { MultilanguageInputComponent } from '@lucca-front/ng/forms';
import { PhoneNumberInputComponent } from '@lucca-front/ng/forms/phone-number-input';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { ReadMoreComponent } from '@lucca-front/ng/read-more';
import { ScrollBoxComponent } from '@lucca-front/ng/scroll-box';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { DurationPickerComponent, TimePickerComponent, TimeRangePickerComponent } from '@lucca-front/ng/time';
import { defineElement } from './define-element';

/**
 * Components rendered by Angular at runtime, keyed by the name used in `window.Prisme`.
 * CSS-only components are not exposed: prototypes use their HTML markup, as in production.
 */
const ELEMENTS: Record<string, { tagName: string; component: Type<unknown> }> = {
	// Forms
	DateInput: { tagName: 'lu-date-input', component: DateInputComponent },
	DateRangeInput: { tagName: 'lu-date-range-input', component: DateRangeInputComponent },
	DurationPicker: { tagName: 'lu-duration-picker', component: DurationPickerComponent },
	MultiSelect: { tagName: 'lu-multi-select', component: LuMultiSelectInputComponent },
	MultilanguageInput: { tagName: 'lu-multilanguage-input', component: MultilanguageInputComponent },
	PhoneNumberInput: { tagName: 'lu-phone-number-input', component: PhoneNumberInputComponent },
	SimpleSelect: { tagName: 'lu-simple-select', component: LuSimpleSelectInputComponent },
	TimePicker: { tagName: 'lu-time-picker', component: TimePickerComponent },
	TimeRangePicker: { tagName: 'lu-time-range-picker', component: TimeRangePickerComponent },
	// Files
	FileEntry: { tagName: 'lu-file-entry', component: FileEntryComponent },
	MultiFileUpload: { tagName: 'lu-multi-file-upload', component: MultiFileUploadComponent },
	SingleFileUpload: { tagName: 'lu-single-file-upload', component: SingleFileUploadComponent },
	// Structure and content
	EmptyStatePage: { tagName: 'lu-empty-state-page', component: EmptyStatePageComponent },
	EmptyStateSection: { tagName: 'lu-empty-state-section', component: EmptyStateSectionComponent },
	Grid: { tagName: 'lu-grid', component: GridComponent },
	GridColumn: { tagName: 'lu-grid-column', component: GridColumnComponent },
	ReadMore: { tagName: 'lu-read-more', component: ReadMoreComponent },
	ScrollBox: { tagName: 'lu-scroll-box', component: ScrollBoxComponent },
	SkipLinks: { tagName: 'lu-skip-links', component: LuSkipLinksComponent },
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
