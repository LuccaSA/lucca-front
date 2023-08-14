import { ILuApiService, ALuApiService } from '@lucca-front/ng/api';
import { ILuEstablishment } from '../establishment.model';

export type ILuEstablishmentService<E extends ILuEstablishment = ILuEstablishment> = ILuApiService<E>;

export abstract class ALuEstablishmentService<E extends ILuEstablishment = ILuEstablishment> extends ALuApiService<E> implements ILuEstablishmentService<E> {}
