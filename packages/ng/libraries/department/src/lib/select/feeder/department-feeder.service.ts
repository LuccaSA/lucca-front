import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ALuDepartmentService, ILuDepartmentService } from './department-feeder.model';
import { map } from 'rxjs/operators';
import { ILuTree, ILuParams } from '@lucca-front/ng/core';
import { ILuDepartment } from '../../department.model';

@Injectable()
export class LuDepartmentService extends ALuDepartmentService<ILuDepartment> implements ILuDepartmentService<ILuDepartment> {
	constructor(protected _http: HttpClient) { super(); }
	get(params?: ILuParams) {
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
