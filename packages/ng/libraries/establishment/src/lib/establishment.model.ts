import { ILuApiItem } from '@lucca-front/ng/api';

export interface ILuLegalUnit extends ILuApiItem { }

export interface ILuEstablishment extends ILuApiItem {
	code: string;
	legalUnitId: number;
	legalUnit: ILuLegalUnit;
}
