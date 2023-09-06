import { ILuApiItem } from '@lucca-front/ng/api';

export type ILuJob = ILuApiItem;

export type ILuJobLevel = ILuApiItem;

export interface ILuQualification extends ILuApiItem {
	job: ILuJob;
	level: ILuJobLevel;
}
