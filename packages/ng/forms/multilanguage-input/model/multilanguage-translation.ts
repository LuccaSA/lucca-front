export interface MultilanguageTranslation {
	cultureCode: string;
	value: string;
	required?: boolean;
}

export const INVARIANT_CULTURE_CODE = 'invariant';
