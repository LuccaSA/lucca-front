import { ILuApiItem } from '@lucca-front/ng/api';

export interface ILuJob extends ILuApiItem { }

export interface ILuJobLevel extends ILuApiItem { }

export interface ILuQualification extends ILuApiItem {
	job: ILuJob;
	level: ILuJobLevel;
}