import { ALuApiService, ILuApiService } from '@lucca-front/ng/api';
import { ILuLegalUnit } from '../establishment.model';

export interface ILuLegalUnitService<E extends ILuLegalUnit = ILuLegalUnit>
	extends ILuApiService<E> { }

export abstract class ALuLegalUnitService<E extends ILuLegalUnit = ILuLegalUnit>
	extends ALuApiService<E>
	implements ILuLegalUnitService<E> { }