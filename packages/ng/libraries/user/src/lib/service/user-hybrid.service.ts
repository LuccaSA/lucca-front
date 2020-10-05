import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ILuUserService } from './user-service.model';
import { LuUserV3Service } from './user-v3.service';
import { ALuUserService } from './user-service.model';
import { ILuUser } from '../user.model';
import { LuUserV4Service } from './user-v4.service';

@Injectable()
export class LuUserHybridService<U extends ILuUser = ILuUser> extends ALuUserService<U> implements ILuUserService<U> {
	private _v3Service: LuUserV3Service<U>;
	private _v4Service: LuUserV4Service<U>;

	private _standard = 'v3';
	set standard(std: string) { this._standard = std; }

	// api v3 only
	set fields(fields: string) { this._v3Service.fields = fields; }
	set filters(filters: string[]) { this._v3Service.filters = filters; }
	set orderBy(orderBy: string) { this._v3Service.orderBy = orderBy; }
	set appInstanceId(appInstanceId: number | string) { this._v3Service.appInstanceId = appInstanceId; }
	set operations(operations: number[]) { this._v3Service.operations = operations; }

	private get _service(): ALuUserService<U> {
		switch(this._standard) {
			case 'v4':
				return this._v4Service;
			case 'v3':
			default:
				return this._v3Service;
		}
	}

	constructor(
		private _http: HttpClient,
	) {
		super();
		this._v3Service = new LuUserV3Service(this._http);
		this._v4Service = new LuUserV4Service(this._http);
	}

	getMe(): Observable<U> {
		return this._service.getMe();
	}

	getAll(filters: string[] = []): Observable<U[]> {
		return this._service.getAll(filters);
	}

	getPaged(page: number, filters: string[] = []): Observable<U[]> {
		return this._service.getPaged(page, filters);
	}

	searchAll(clue: string, filters: string[] = []): Observable<U[]> {
		return this._service.searchAll(clue, filters);
	}

	searchPaged(clue: string, page: number, filters: string[] = []): Observable<U[]> {
		return this._service.searchPaged(clue, page, filters);
	}
}