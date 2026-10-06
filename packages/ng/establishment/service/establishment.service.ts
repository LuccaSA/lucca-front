import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LuApiV4Service } from '@lucca-front/ng/api';
import { ILuEstablishment } from '../establishment.model';

@Injectable()
export class LuEstablishmentService extends LuApiV4Service<ILuEstablishment> {
	protected override _api = `/organization/structure/api/establishments`;

	protected _appInstanceId: number | null = null;
	set appInstanceId(id: number) {
		this._appInstanceId = id;
	}
	protected _operations: number[] = [];
	set operations(ops: number[]) {
		this._operations = ops || [];
	}
	protected _uniqueOperations: number[] = [];
	set uniqueOperations(ops: number[]) {
		this._uniqueOperations = ops || [];
	}
	override get filters(): string[] {
		if (this._uniqueOperations.length) {
			return [...this._filters, `uniqueOperations=${this._uniqueOperations.join(',')}`];
		}

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

	constructor(protected override _http: HttpClient) {
		super(_http);
	}
}
