import { FormControl } from '@angular/forms';
import { MultilanguageTranslation } from './model/multilanguage-translation';
import { MultiLanguageInputValidators } from './validators';

describe('MultiLanguageInputValidators', () => {
	function control(value: MultilanguageTranslation[]): FormControl<MultilanguageTranslation[]> {
		return new FormControl(value, { nonNullable: true });
	}

	describe('allLanguagesRequired', () => {
		it('should be valid when every translation is filled', () => {
			// Act
			const result = MultiLanguageInputValidators.allLanguagesRequired(
				control([
					{ cultureCode: 'invariant', value: 'Hello' },
					{ cultureCode: 'fr-FR', value: 'Bonjour' },
				]),
			);

			// Assert
			expect(result).toBeNull();
		});

		it('should return missingLang when a translation is empty', () => {
			// Act
			const result = MultiLanguageInputValidators.allLanguagesRequired(
				control([
					{ cultureCode: 'invariant', value: 'Hello' },
					{ cultureCode: 'fr-FR', value: '' },
				]),
			);

			// Assert
			expect(result).toEqual({ missingLang: true });
		});
	});

	describe('invariantRequired', () => {
		it('should be valid when the invariant is filled, even if other translations are empty', () => {
			// Act
			const result = MultiLanguageInputValidators.invariantRequired(
				control([
					{ cultureCode: 'invariant', value: 'Hello' },
					{ cultureCode: 'fr-FR', value: '' },
				]),
			);

			// Assert
			expect(result).toBeNull();
		});

		it('should return missingInvariant when the invariant is empty', () => {
			// Act
			const result = MultiLanguageInputValidators.invariantRequired(
				control([
					{ cultureCode: 'invariant', value: '' },
					{ cultureCode: 'fr-FR', value: 'Bonjour' },
				]),
			);

			// Assert
			expect(result).toEqual({ missingInvariant: true });
		});

		it('should return missingInvariant when there is no invariant translation', () => {
			// Act
			const result = MultiLanguageInputValidators.invariantRequired(control([{ cultureCode: 'fr-FR', value: 'Bonjour' }]));

			// Assert
			expect(result).toEqual({ missingInvariant: true });
		});
	});
});
