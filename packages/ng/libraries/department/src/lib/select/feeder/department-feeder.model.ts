import { ILuTree, ILuParams } from '@lucca-front/ng/core';
import { ILuDepartment } from '../../department.model';
import { Observable } from 'rxjs';

export interface ILuDepartmentService<D extends ILuDepartment = ILuDepartment> {
	getAll(filters?: string[]): Observable<ILuTree<D>[]>;
	getPaged(page: number, filters?: string[]): Observable<ILuTree<D>[]>;
	searchAll(clue: string, filters?: string[]): Observable<ILuTree<D>[]>;
	searchPaged(clue: string, page: number, filters?: string[]): Observable<ILuTree<D>[]>;
}
export abstract class ALuDepartmentService<D extends ILuDepartment = ILuDepartment> implements ILuDepartmentService<D> {
	abstract getAll(filters?: string[]): Observable<ILuTree<D>[]>;
	abstract getPaged(page: number, filters?: string[]): Observable<ILuTree<D>[]>;
	abstract searchAll(clue: string, filters?: string[]): Observable<ILuTree<D>[]>;
	abstract searchPaged(clue: string, page: number, filters?: string[]): Observable<ILuTree<D>[]>;
}
