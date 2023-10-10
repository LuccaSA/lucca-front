import { Observable } from 'rxjs';

export interface ILuApiService<T extends import('../api.model').ILuApiItem = import('../api.model').ILuApiItem> {
	getAll(filters?: readonly string[]): Observable<readonly T[]>;
	getPaged(page: number, filters?: readonly string[]): Observable<readonly T[]>;
	searchAll(clue: string, filters?: readonly string[]): Observable<readonly T[]>;
	searchPaged(clue: string, page: number, filters?: readonly string[]): Observable<readonly T[]>;
}

export abstract class ALuApiService<T extends import('../api.model').ILuApiItem = import('../api.model').ILuApiItem> implements ILuApiService<T> {
	abstract getAll(filters?: readonly string[]): Observable<readonly T[]>;
	abstract getPaged(page: number, filters?: readonly string[]): Observable<readonly T[]>;
	abstract searchAll(clue: string, filters?: readonly string[]): Observable<readonly T[]>;
	abstract searchPaged(clue: string, page: number, filters?: readonly string[]): Observable<readonly T[]>;
}
