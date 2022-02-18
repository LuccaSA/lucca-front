import { Observable } from 'rxjs';

export interface ILuApiService<T extends import('../api.model').ILuApiItem = import('../api.model').ILuApiItem> {
	getAll(filters?: string[]): Observable<T[]>;
	getPaged(page: number, filters?: string[]): Observable<T[]>;
	searchAll(clue: string, filters?: string[]): Observable<T[]>;
	searchPaged(clue: string, page: number, filters?: string[]): Observable<T[]>;
}

export abstract class ALuApiService<T extends import('../api.model').ILuApiItem = import('../api.model').ILuApiItem> implements ILuApiService<T> {
	abstract getAll(filters?: string[]): Observable<T[]>;
	abstract getPaged(page: number, filters?: string[]): Observable<T[]>;
	abstract searchAll(clue: string, filters?: string[]): Observable<T[]>;
	abstract searchPaged(clue: string, page: number, filters?: string[]): Observable<T[]>;
}
