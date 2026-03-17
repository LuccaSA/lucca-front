import { TestBed } from '@angular/core/testing';
import { LOCALE_ID } from '@angular/core';
import { IntlPluralPipe, LU_PLURAL_RULES } from './intl-plural';
import { LuPluralTranslation } from './translation.model';

describe('IntlPluralPipe', () => {
	function createPipe(locale = 'en') {
		TestBed.configureTestingModule({
			providers: [IntlPluralPipe, { provide: LOCALE_ID, useValue: locale }, { provide: LU_PLURAL_RULES, useValue: new Intl.PluralRules(locale) }],
		});
		return TestBed.inject(IntlPluralPipe);
	}

	it('should create an instance', () => {
		// Arrange + Act
		const pipe = createPipe();

		// Assert
		expect(pipe).toBeTruthy();
	});

	it('should return the "one" form when count is 1 (en locale)', () => {
		// Arrange
		const pipe = createPipe('en');
		const translation: LuPluralTranslation = { one: 'one item', other: 'many items' };

		// Act
		const result = pipe.transform(translation, 1);

		// Assert
		expect(result).toBe('one item');
	});

	it('should return the "other" form when count is 0 (en locale)', () => {
		// Arrange
		const pipe = createPipe('en');
		const translation: LuPluralTranslation = { one: 'one item', other: 'many items' };

		// Act
		const result = pipe.transform(translation, 0);

		// Assert
		expect(result).toBe('many items');
	});

	it('should return the "other" form when count is greater than 1 (en locale)', () => {
		// Arrange
		const pipe = createPipe('en');
		const translation: LuPluralTranslation = { one: 'one item', other: 'many items' };

		// Act
		const result = pipe.transform(translation, 5);

		// Assert
		expect(result).toBe('many items');
	});

	it('should fall back to "other" when the plural form key is missing from the translation', () => {
		// Arrange
		const pipe = createPipe('en');
		const translation: LuPluralTranslation = { other: 'fallback' };

		// Act
		const result = pipe.transform(translation, 1);

		// Assert
		expect(result).toBe('fallback');
	});

	it.each`
		count  | expected
		${0}   | ${'many items'}
		${1}   | ${'one item'}
		${2}   | ${'many items'}
		${10}  | ${'many items'}
		${100} | ${'many items'}
	`('should return "$expected" for count=$count (en locale)', ({ count, expected }: { count: number; expected: string }) => {
		// Arrange
		const pipe = createPipe('en');
		const translation: LuPluralTranslation = { one: 'one item', other: 'many items' };

		// Act
		const result = pipe.transform(translation, count);

		// Assert
		expect(result).toBe(expected);
	});

	it('should use "few" form when available and locale resolves to it (ar locale)', () => {
		// Arrange
		const pipe = createPipe('ar');
		const translation: LuPluralTranslation = { few: 'عدد قليل', other: 'آخرون' };

		// Act
		// Arabic: 3–10 map to "few"
		const result = pipe.transform(translation, 3);

		// Assert
		expect(result).toBe('عدد قليل');
	});

	it('should fall back to "other" for a locale that only has "one" and "other" categories', () => {
		// Arrange
		const pipe = createPipe('fr');
		const translation: LuPluralTranslation = { one: 'un élément', other: 'plusieurs éléments' };

		// Act
		const result = pipe.transform(translation, 2);

		// Assert
		expect(result).toBe('plusieurs éléments');
	});
});
