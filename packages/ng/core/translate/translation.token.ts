import { inject, InjectionToken, LOCALE_ID } from '@angular/core';

export const LOCALE_PLURAL_RULES = new InjectionToken('LocalePluralRules', { factory: () => new Intl.PluralRules(inject(LOCALE_ID)) });
