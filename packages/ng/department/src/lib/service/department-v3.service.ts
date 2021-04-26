import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILuDepartmentService } from './department-service.model';
import { map } from 'rxjs/operators';
import { ILuTree } from '@lucca-front/ng/core';
import { ILuDepartment } from '../department.model';
import { LuApiV3Service } from '@lucca-front/ng/api';

@Injectable()
export class LuDepartmentService extends LuApiV3Service<ILuDepartment> implements ILuDepartmentService<ILuDepartment> {
	protected _api = `/api/v3/departments`;

	constructor(protected _http: HttpClient) { super(_http); }

	getTrees() {
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
