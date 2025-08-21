import { ILuApiItem } from '@lucca-front/ng/api';

export interface LuCoreSelectLegalUnit extends ILuApiItem {
	countryId: number;
}

export interface LuCoreSelectEstablishment extends ILuApiItem {
	code: string;
	legalUnitId: number;
	legalUnit: LuCoreSelectLegalUnit;
}
