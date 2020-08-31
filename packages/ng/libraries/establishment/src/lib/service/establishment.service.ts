import { Injectable } from '@angular/core';
import { ILuEstablishment } from '../establishment.model';
import { HttpClient } from '@angular/common/http';
import { LuApiV4Service } from '@lucca-front/ng/api';

@Injectable()
export class LuEstablishmentService extends LuApiV4Service<ILuEstablishment> {
	protected _api = `/organization/structure/api/establishments`;
	constructor(protected _http: HttpClient) { super(_http); }
}
