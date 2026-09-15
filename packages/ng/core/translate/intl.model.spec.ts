import { InjectionToken, LOCALE_ID, input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { getIntl, intlInputOptions } from './intl.model';
import { LuTranslation } from './translation.model';

interface Labels {
	hello: string;
	bye: string;
}

interface OtherLabels {
	other: string;
}

const LABELS = new InjectionToken<LuTranslation<Labels>>('Labels');
const OTHER_LABELS = new InjectionToken<LuTranslation<OtherLabels>>('OtherLabels');

const labels: LuTranslation<Labels> = {
	en: { hello: 'Hello', bye: 'Bye' },
	'en-GB': { hello: 'Hullo', bye: 'Cheerio' },
	fr: { hello: 'Bonjour', bye: 'Au revoir' },
	'fr-FR': { hello: 'Bonjour (FR)', bye: 'Au revoir (FR)' },
};

function setupIntl(locale: string, translations: LuTranslation<Labels> = labels): Labels {
	TestBed.configureTestingModule({
		providers: [
			{ provide: LOCALE_ID, useValue: locale },
			{ provide: LABELS, useValue: translations },
		],
	});

	return TestBed.runInInjectionContext(() => getIntl(LABELS));
}

describe(getIntl.name, () => {
	it('should return the translations of the exact locale', () => {
		// Act
		const intl = setupIntl('fr-FR');

		// Assert
		expect(intl).toEqual({ hello: 'Bonjour (FR)', bye: 'Au revoir (FR)' });
	});

	it('should fall back on the 2-letter locale when the exact one is missing', () => {
		// Act
		const intl = setupIntl('fr-BE');

		// Assert
		expect(intl).toEqual({ hello: 'Bonjour', bye: 'Au revoir' });
	});

	it('should fall back on english when the locale is unknown', () => {
		// Act
		const intl = setupIntl('de-DE');

		// Assert
		expect(intl).toEqual({ hello: 'Hello', bye: 'Bye' });
	});

	it('should fall back on en-GB when neither the locale nor en are available', () => {
		// Act
		const intl = setupIntl('de-DE', { 'en-GB': labels['en-GB'], 'en-US': labels['en'] });

		// Assert
		expect(intl).toEqual({ hello: 'Hullo', bye: 'Cheerio' });
	});

	it('should fall back on en-US when neither the locale, en nor en-GB are available', () => {
		// Act
		const intl = setupIntl('de-DE', { 'en-US': { hello: 'Howdy', bye: 'Bye' } });

		// Assert
		expect(intl).toEqual({ hello: 'Howdy', bye: 'Bye' });
	});

	it('should return undefined when no locale matches and there is no english fallback', () => {
		// Act
		const intl = setupIntl('de-DE', { fr: labels['fr'] });

		// Assert
		expect(intl).toBeUndefined();
	});
});

describe(intlInputOptions.name, () => {
	function setupOptions(locale = 'fr-FR') {
		TestBed.configureTestingModule({
			providers: [
				{ provide: LOCALE_ID, useValue: locale },
				{ provide: LABELS, useValue: labels },
				{ provide: OTHER_LABELS, useValue: { en: { other: 'Other' }, fr: { other: 'Autre' } } satisfies LuTranslation<OtherLabels> },
			],
		});

		return TestBed.runInInjectionContext(() => intlInputOptions(LABELS, OTHER_LABELS));
	}

	it('should use the resolved translations as default value', () => {
		// Act
		const [defaultValue] = setupOptions();

		// Assert
		expect(defaultValue).toEqual({ hello: 'Bonjour (FR)', bye: 'Au revoir (FR)', other: 'Autre' });
	});

	it('should merge the translations of every token', () => {
		// Act
		const [defaultValue] = setupOptions('en');

		// Assert
		expect(defaultValue).toEqual({ hello: 'Hello', bye: 'Bye', other: 'Other' });
	});

	it('should merge a partial patch over the default translations', () => {
		// Arrange
		const [, options] = setupOptions();

		// Act
		const result = options.transform({ hello: 'Salut' });

		// Assert
		expect(result).toEqual({ hello: 'Salut', bye: 'Au revoir (FR)', other: 'Autre' });
	});

	it('should keep the default translations when the patch is empty', () => {
		// Arrange
		const [defaultValue, options] = setupOptions();

		// Act
		const result = options.transform({});

		// Assert
		expect(result).toEqual(defaultValue);
	});

	it('should not mutate the default value when transforming', () => {
		// Arrange
		const [defaultValue, options] = setupOptions();

		// Act
		options.transform({ hello: 'Salut' });

		// Assert
		expect(defaultValue.hello).toBe('Bonjour (FR)');
	});

	it('should be usable as arguments of a signal input', () => {
		// Arrange
		const options = setupOptions();

		// Act
		const intl = TestBed.runInInjectionContext(() => input(...options));

		// Assert
		expect(intl()).toEqual({ hello: 'Bonjour (FR)', bye: 'Au revoir (FR)', other: 'Autre' });
	});
});
