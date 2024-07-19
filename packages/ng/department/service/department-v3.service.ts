import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILuApiResponse, LuApiV3Service } from '@lucca-front/ng/api';
import { ILuTree } from '@lucca-front/ng/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ILuDepartment } from '../department.model';
import { ILuDepartmentService } from './department-service.model';

export interface IApiDepartment {
	node: ILuDepartment;
	children: IApiDepartment[];
}

@Injectable()
export class LuDepartmentService extends LuApiV3Service<ILuDepartment> implements ILuDepartmentService<ILuDepartment> {
	protected override _api = `/organization/structure/api/departments`;
	protected _appInstanceId: number | string;
	set appInstanceId(appInstanceId: number | string) {
		if (appInstanceId) {
			this._appInstanceId = appInstanceId;
		}
	}
	protected _operations: number[] = [];
	set operations(operations: number[]) {
		this._operations = operations;
	}

	constructor(protected override _http: HttpClient) {
		super(_http);
	}

	getTrees() {
		let call: Observable<ILuApiResponse<IApiDepartment>>;
		if (this._appInstanceId && this._operations?.length) {
			call = this._http.get<ILuApiResponse<IApiDepartment>>(
				`/api/v3/departments/scopedtree?fields=id,name&${[`appInstanceId=${this._appInstanceId}`, `operations=${this._operations.join(',')}`, this._filters.join(',')].filter((f) => !!f).join('&')}`,
			);
		} else {
			call = this._http.get<ILuApiResponse<IApiDepartment>>(`${this._api}/tree?fields=id,name&${this._filters.join(',')}`);
		}
		return call.pipe(
			map((response: ILuApiResponse<IApiDepartment>): ILuTree<ILuDepartment>[] => {
				const tree = response.data;
				return tree?.children.map((c) => this.format(c)) ?? [];
			}),
		);
	}

	private format(t: IApiDepartment): ILuTree<ILuDepartment> {
		return { value: t.node, children: t.children.map((c) => this.format(c)) };
	}
}
