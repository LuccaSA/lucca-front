/**
 * @deprecated use `LuTranslation` instead.
 */
export interface ILuTranslation<T> {
	en: T;
	'en-GB'?: T;
	'en-US'?: T;
	es?: T;
	de?: T;
	fr?: T;
	pt?: T;
}

export type LuTranslation<T> = Record<string, T>;
