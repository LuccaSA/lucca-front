export interface ILuTranslation<T> {
	en: { [P in keyof T]?: string };
	es?: { [P in keyof T]?: string };
	de?: { [P in keyof T]?: string };
	fr?: { [P in keyof T]?: string };
}
