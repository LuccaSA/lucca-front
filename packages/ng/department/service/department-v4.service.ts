/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { ILuTree } from '@lucca-front/ng/core';
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

	constructor(private _http: HttpClient) {}

	getTrees() {
		let params: Params = {};

		if (this._appInstanceId && this._operations?.length) {
			const splittedFilters = this._filters.reduce((acc, curr) => {
				const split = curr.split('=');
				return { ...acc, [split[0]]: split[1] };
			}, {});

			params = {
				...splittedFilters,
				appInstanceId: this._appInstanceId,
				operations: this._operations.join(','),
			};
		}

		const call = this._http.get<IApiDepartment>(`${this.api}/tree`, { params });

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
