import { LuccaIcon } from '@lucca-front/icons';

export interface I18nTranslation {
	cultureCode: string;
	cultureIcon?: LuccaIcon;
	cultureName: string;
	value: string;
	required?: boolean;
	current?: boolean;
}
