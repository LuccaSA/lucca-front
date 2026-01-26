import { INVARIANT_CULTURE_CODE, MultilanguageTranslation } from './model/multilanguage-translation';
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function areAllLanguagesFilled(model: MultilanguageTranslation[]): boolean {
	return model.every((row) => row.value?.length > 0);
}

export function isInvariantFilled(model: MultilanguageTranslation[]): boolean {
	const invariantTranslation = model.find((row) => row.cultureCode === INVARIANT_CULTURE_CODE);
	return invariantTranslation && invariantTranslation.value?.length > 0;
}

export const MultiLanguageInputValidators: Record<'allLanguagesFilled' | 'invariantFilled', ValidatorFn> = {
	allLanguagesFilled: (control: AbstractControl<MultilanguageTranslation[]>) => (areAllLanguagesFilled(control.value) ? null : { missingLang: true }),
	invariantFilled: (control: AbstractControl<MultilanguageTranslation[]>) => (isInvariantFilled(control.value) ? null : { missingInvariant: true }),
};
