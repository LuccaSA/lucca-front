export interface ILuTranslation<T> {
	en: { [P in keyof T]?: string };
	'en-GB'?: { [P in keyof T]?: string };
	'en-US'?: { [P in keyof T]?: string };
	es?: { [P in keyof T]?: string };
	de?: { [P in keyof T]?: string };
	fr?: { [P in keyof T]?: string };
	pt?: { [P in keyof T]?: string };
}
