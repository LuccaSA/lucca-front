import { ILuApiItem } from '@lucca-front/ng/api';

export interface LuCoreSelectLegalUnit extends ILuApiItem {
	code: string | null;
	legalIdentificationNumber: string | null;
	activityCode: string | null;
	countryId: number;
	headquartersId: number;
	isArchived: boolean;
}
