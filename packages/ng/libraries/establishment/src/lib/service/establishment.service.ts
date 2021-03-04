import { Injectable } from '@angular/core';
import { ILuEstablishment } from '../establishment.model';
import { HttpClient } from '@angular/common/http';
import { LuApiV4Service } from '@lucca-front/ng/api';

@Injectable()
export class LuEstablishmentService extends LuApiV4Service<ILuEstablishment> {
	protected _api = `/organization/structure/api/establishments`;

	protected _appInstanceId: number = null;
	set appInstanceId(id: number) { this._appInstanceId = id; }
	protected _operations: number[] = [];
	set operations(ops: number[]) { this._operations = ops || []; } 
	get filters(): string[] {
		const isScopeFiltered = this._appInstanceId && this._operations.length;

		if (isScopeFiltered) {
			const appIdFilter = `appInstanceId=${this._appInstanceId}`;
			const operationFilter = `operations=${this._operations.join(',')}`;

			return [...this._filters, appIdFilter, operationFilter];
		}

		return this._filters;
	}
	set filters(filters: string[]) {
		this._filters = filters || [];
	}

	constructor(protected _http: HttpClient) { super(_http); }
}
