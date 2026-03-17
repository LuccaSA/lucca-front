import { inject, InjectionToken, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { LuPluralTranslation } from './translation.model';

export const LU_PLURAL_RULES = new InjectionToken('LuPluralRules', {
	factory: () => new Intl.PluralRules(inject(LOCALE_ID)),
});

@Pipe({
	name: 'intlPlural',
	standalone: true,
})
export class IntlPluralPipe implements PipeTransform {
	#pluralRule = inject(LU_PLURAL_RULES);

	transform(value: LuPluralTranslation, count: number): string {
		const pluralForm = this.#pluralRule.select(count);
		return value[pluralForm] ?? value.other;
	}
}
