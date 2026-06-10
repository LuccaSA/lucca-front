/**
 * @deprecated use `LuTranslation` instead.
 */
export interface ILuTranslation<T> {
	en: T;
	fr: T;
	'en-GB'?: T;
	'en-US'?: T;
	es?: T;
	de?: T;
	pt?: T;
}

export type LuTranslation<T> = Record<string, T>;

export interface LuPluralForms {
	zero?: string;
	one?: string;
	two?: string;
	few?: string;
	many?: string;
	other: string;
}

export function getIntlPluralLabel(pluralForms: Intl.PluralRules, label: LuPluralForms, count: number): string {
	const pluralForm = pluralForms.select(count);
	switch (pluralForm) {
		case 'zero':
			return label.zero ?? label.other ?? '';
		case 'one':
			return label.one ?? label.other ?? '';
		case 'two':
			return label.two ?? label.other ?? '';
		case 'few':
			return label.few ?? label.other ?? '';
		case 'many':
			return label.many ?? label.other ?? '';
		default:
			return label.other ?? '';
	}
}
