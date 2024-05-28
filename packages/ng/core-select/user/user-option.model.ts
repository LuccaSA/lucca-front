import { ILuApiItem } from '@lucca-front/ng/api';

export interface LuCoreSelectUser extends ILuApiItem {
	firstName: string;
	lastName: string;
	picture?: {
		href: string;
	};
	additionalInformation?: string;
}
