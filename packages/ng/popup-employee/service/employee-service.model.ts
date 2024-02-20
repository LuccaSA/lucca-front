import { Observable } from 'rxjs';
import { LuEmployeeCard } from '../employee.model';

export interface ILuEmployeeCardStore {
	get(id: number): Observable<LuEmployeeCard>;
	clearCache(userId?: number): void;
}
