import { MultilanguageTranslation } from './model/multilanguage-translation';
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function areAllLanguagesFilled(model: MultilanguageTranslation[]): boolean {
	return model.every((row) => row.value?.length > 0);
}

export const MultiLanguageInputValidators: Record<string, ValidatorFn> = {
	allLanguagesFilled: (control: AbstractControl<MultilanguageTranslation[]>) => (areAllLanguagesFilled(control.value) ? null : { missingLang: true }),
};
