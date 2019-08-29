import { IUser } from '../../user.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LuUserDisplayPipe, LuDisplayFullname, LuDisplayInitials } from '../../display/index';
import { delay, map, catchError } from 'rxjs/operators';

interface IHomonyms<U extends IUser = IUser> {
	[key: string]: U[];
}

export interface ILuUserHomonymsService<U extends IUser = IUser> {
	extractHomonyms(users: U[]): U[];
	enrichHomonyms(homonyms: U[]): Observable<U[]>;
}

export abstract class ALuUserHomonymsService<U extends IUser = IUser> implements ILuUserHomonymsService<U> {
	abstract extractHomonyms(users: U[]): U[];
	abstract enrichHomonyms(homonyms: U[]): Observable<U[]>;
}
export class LuUserHomonymsService<U extends IUser = IUser> extends ALuUserHomonymsService<U> implements ILuUserHomonymsService<U> {
	private _format = LuDisplayFullname.lastfirst;
	extractHomonyms(users: U[]): U[] {
		const namesCount = {} as { [key: string]: number};
		users.forEach(user => {
			const name = this._pipe.transform(user, this._format);
			const count = namesCount[name] || 0;
			namesCount[name] = count + 1;
		});

		const nonUniqNames = Object.keys(namesCount)
		.filter(key => namesCount[key] > 1);

		const homonymsByname = {} as IHomonyms<U>;
		nonUniqNames.forEach(name => {
			homonymsByname[name] = users.filter(u => name === this._pipe.transform(u, this._format));
		});
		const homonyms = [] as U[];
		Object.keys(homonymsByname).forEach(name => homonyms.push(...homonymsByname[name]));
		return homonyms;
	}

	enrichHomonyms(homonyms: U[]): Observable<U[]> {
		if (!homonyms || homonyms.length === 0) { return of([]); }
		return this._http.get<any>(`/api/v3/users`, { params: {
			'id': homonyms.map(u => u.id).join(','),
			'fields': 'id,department.name',
		}}).pipe(
			map(res => res.data.items as { id: number, department?: { name: string }}[]),
			map(infos => infos.map(info => {
					const homonym = homonyms.find(h => h.id === info.id);
					return { ...homonym, additionalInformation: info.department ? info.department.name : '' } as U;
				}) as U[]
			),
			catchError(err => of([])),
		);
	}
	constructor(
		private _pipe: LuUserDisplayPipe,
		private _http: HttpClient,
	) {
		super();
	}
}
