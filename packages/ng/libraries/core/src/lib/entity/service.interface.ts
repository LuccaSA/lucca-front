import { Observable } from 'rxjs';
import { ILuParams } from './params.interface';


export interface ILuService<T = any> {
	get(params?: ILuParams): Observable<T[]>;
}
