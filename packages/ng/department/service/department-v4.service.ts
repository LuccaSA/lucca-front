/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILuApiResponse } from '@lucca-front/ng/api';
import { ILuTree } from '@lucca-front/ng/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ILuDepartment } from '../department.model';
import { IApiDepartment } from './department-v3.service';

@Injectable()
export class LuDepartmentV4Service {
	api = `/organization/structure/api/departments`;
	protected _filters: string[] = [];
	set filters(filters: string[]) {
		this._filters = filters ?? [];
	}
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

	protected _uniqueOperation: number;
	set uniqueOperation(uniqueOperation: number) {
		this._uniqueOperation = uniqueOperation;
	}

	constructor(private _http: HttpClient) {}

	getTrees() {
		let call: Observable<IApiDepartment>;
		if (this._appInstanceId && this._operations?.length) {
			call = this._http
				.get<
					ILuApiResponse<IApiDepartment>
				>(`/api/v3/departments/scopedtree?fields=id,name&${[`appInstanceId=${this._appInstanceId}`, `operations=${this._operations.join(',')}`, this._filters.join(',')].filter((f) => !!f).join('&')}`)
				.pipe(map((response) => response.data));
		} else if (this._uniqueOperation) {
			call = this._http.get<IApiDepartment>(`${this.api}/tree`, { params: { uniqueOperation: this._uniqueOperation } });
		} else {
			call = this._http.get<IApiDepartment>(`${this.api}/tree`);
		}

		return call.pipe(
			map((tree: IApiDepartment): ILuTree<ILuDepartment>[] => {
				return tree?.children.map((c) => this.format(c)) ?? [];
			}),
		);
	}

	private format(t: IApiDepartment): ILuTree<ILuDepartment> {
		return { value: t.node, children: t.children.map((c) => this.format(c)) };
	}
}
