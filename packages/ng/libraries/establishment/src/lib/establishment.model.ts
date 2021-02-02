import { ILuApiItem } from '@lucca-front/ng/api';

export interface ILuEstablishment extends ILuApiItem {
	legalUnit: ILuApiItem;
}
