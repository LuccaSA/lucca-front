import { I18nTranslation } from './i18n-translation.model';
import { ValidationErrors } from '@angular/forms';

export const translationsValidator = (translations?: I18nTranslation[]): ValidationErrors | null => {
	return translations?.some((t) => t.required && !t.value)
		? {
				required: true,
		  }
		: null;
};
