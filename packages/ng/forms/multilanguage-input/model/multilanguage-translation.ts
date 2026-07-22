export interface MultilanguageTranslation {
	cultureCode: string;
	value: string;
	cultureCodeDisplay?: string;
}

export const INVARIANT_CULTURE_CODE = 'invariant';
