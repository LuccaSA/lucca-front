import { inject, Pipe, PipeTransform } from '@angular/core';
import { getIntlPluralLabel, LuPluralForms } from './translation.model';
import { LOCALE_PLURAL_RULES } from './translation.token';

@Pipe({
	name: 'intlPluralLabel',
})
export class IntlPluralLabelPipe implements PipeTransform {
	private readonly pluralRules = inject(LOCALE_PLURAL_RULES);

	transform(value: LuPluralForms, count: number): string {
		return getIntlPluralLabel(this.pluralRules, value, count);
	}
}
