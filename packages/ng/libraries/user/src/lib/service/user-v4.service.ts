import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILuUser } from '../user.model';
import { ILuUserService } from './user-service.model';
import { LuApiV4Service } from '@lucca-front/ng/api';


@Injectable()
export class LuUserV4Service<U extends ILuUser = ILuUser> extends LuApiV4Service<U> implements ILuUserService<U> {
	protected _api = `/directory/api/4.0/users`;

	constructor(protected _http: HttpClient) {
		super(_http);
	}

	getMe(): Observable<U> {
		return this._http.get<U>(`${this._api}/me`);
	}
}
