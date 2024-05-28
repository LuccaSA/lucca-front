import { ILuApiItem } from '@lucca-front/ng/api';

export type LuCoreSelectJob = ILuApiItem;

export type LuCoreSelectJobQualificationLevel = ILuApiItem;

export interface LuCoreSelectJobQualification extends ILuApiItem {
	job: LuCoreSelectJob;
	level: LuCoreSelectJobQualificationLevel;
}
