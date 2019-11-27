import { ILuService } from './service.interface';
import { ILuParams } from './params.interface';
import { Observable } from 'rxjs';

export abstract class ALuService<T = any> implements ILuService<T> {
	abstract get(params: ILuParams): Observable<T[]>;
}
