import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILuDepartmentService } from './department-service.model';
import { map } from 'rxjs/operators';
import { ILuTree } from '@lucca-front/ng/core';
import { ILuDepartment } from '../department.model';
import { LuApiV3Service } from '@lucca-front/ng/api';
import { Observable } from 'rxjs';

@Injectable()
export class LuDepartmentV3Service extends LuApiV3Service<ILuDepartment> implements ILuDepartmentService<ILuDepartment> {
	protected override _api = `/api/v3/departments`;
	protected _appInstanceId: number | string;
	set appInstanceId(appInstanceId: number | string) { this._appInstanceId = appInstanceId; }
	protected _operations: number[] = [];
	set operations(operations: number[]) { this._operations = operations; }

	constructor(protected override _http: HttpClient) { super(_http); }

	getTrees() {
		let call: Observable<any>;
		if (this._appInstanceId && this._operations?.length) {
			call = this._http.get(`/api/v3/departments/scopedtree?fields=id,name&appInstanceId=${this._appInstanceId}&operations=${this._operations.join(',')}`);
		} else {
			call = this._http.get('/api/v3/departments/tree?fields=id,name');
		}
		return call.pipe(
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
