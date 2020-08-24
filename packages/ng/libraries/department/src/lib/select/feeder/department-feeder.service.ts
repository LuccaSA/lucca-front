import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ALuDepartmentService, ILuDepartmentService } from './department-feeder.model';
import { map } from 'rxjs/operators';
import { ILuTree, ILuParams } from '@lucca-front/ng/core';
import { ILuDepartment } from '../../department.model';
import { Observable } from 'rxjs';

@Injectable()
export class LuDepartmentService extends ALuDepartmentService<ILuDepartment> implements ILuDepartmentService<ILuDepartment> {
	getPaged(page: number, filters?: string[]): Observable<ILuTree<ILuDepartment>[]> {
		throw new Error("Method not implemented.");
	}
	searchAll(clue: string, filters?: string[]): Observable<ILuTree<ILuDepartment>[]> {
		throw new Error("Method not implemented.");
	}
	searchPaged(clue: string, page: number, filters?: string[]): Observable<ILuTree<ILuDepartment>[]> {
		throw new Error("Method not implemented.");
	}

	constructor(protected _http: HttpClient) { super(); }

	getAll(filters: string[] = []) {
		return this._http.get('/api/v3/departments/tree?fields=id,name').pipe(
			map((response: any): ILuTree<ILuDepartment>[] => {
				const tree = response.data;
				return tree.children.map(c => this.format(c));
			})
		);
	}
	private format(t): ILuTree<ILuDepartment> {
		return { value: t.node, children: t.children.map(c => this.format(c)) };
	}
}
