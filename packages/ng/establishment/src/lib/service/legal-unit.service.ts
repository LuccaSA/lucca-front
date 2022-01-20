import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LuApiV4Service } from '@lucca-front/ng/api';
import { ILuLegalUnit } from '../establishment.model';

@Injectable()
export class LuLegalUnitService extends LuApiV4Service<ILuLegalUnit> {
	protected override _api = `/organization/structure/api/legal-units`;

	protected _appInstanceId: number = null;
	set appInstanceId(id: number) { this._appInstanceId = id; }
	protected _operations: number[] = [];
	set operations(ops: number[]) { this._operations = ops || []; }
	override get filters(): string[] {
		const isScopeFiltered = this._appInstanceId && this._operations.length;

		if (isScopeFiltered) {
			const appIdFilter = `appInstanceId=${this._appInstanceId}`;
			const operationFilter = `operations=${this._operations.join(',')}`;

			return [...this._filters, appIdFilter, operationFilter];
		}

		return this._filters;
	}
	override set filters(filters: string[]) {
		this._filters = filters || [];
	}

	constructor(protected override _http: HttpClient) { super(_http); }
}
