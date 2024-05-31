import { ILuApiItem } from '@lucca-front/ng/api';

export interface LuCoreSelectUser extends ILuApiItem {
	firstName: string;
	lastName: string;
	picture?: {
		href: string;
	};
}

export type LuCoreSelectWithAdditionnalInformation<T> = T & {
	additionalInformation?: string;
};
