import { ILuUser } from '../../user.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LuUserDisplayPipe, LuDisplayFullname } from '../../display/index';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

interface IV3CollectionResponse<T = any> {
	data: { items: T[] };
}

export interface ILuUserHomonymsService<U extends ILuUser = ILuUser> {
	extractHomonyms(users: U[]): U[];
	enrichHomonyms(homonyms: U[]): Observable<U[]>;
}

export abstract class ALuUserHomonymsService<U extends ILuUser = ILuUser>
	implements ILuUserHomonymsService<U>
{
	abstract extractHomonyms(users: U[]): U[];
	abstract enrichHomonyms(homonyms: U[]): Observable<U[]>;
}
@Injectable()
export class LuUserHomonymsService<U extends ILuUser = ILuUser>
	extends ALuUserHomonymsService<U>
	implements ILuUserHomonymsService<U>
{
	private _format = LuDisplayFullname.lastfirst;
	extractHomonyms(users: U[]): U[] {
		const usersByName = {} as { [key: string]: U[] };
		users.forEach((user) => {
			const name = this._pipe.transform(user, this._format);
			usersByName[name] = [...(usersByName[name] || []), user];
		});

		const nonUniqNames = Object.keys(usersByName).filter(
			(key) => usersByName[key].length > 1,
		);

		const homonyms = [] as U[];
		nonUniqNames.forEach((name) => homonyms.push(...usersByName[name]));
		return homonyms;
	}

	enrichHomonyms(homonyms: U[]): Observable<U[]> {
		if (!homonyms || homonyms.length === 0) {
			return of([]);
		}
		return this._http
			.get<IV3CollectionResponse<{ id: number; department: { name: string } }>>(
				`/api/v3/users`,
				{
					params: {
						id: homonyms.map((u) => u.id).join(','),
						fields: 'id,department.name',
					},
				},
			)
			.pipe(
				map(
					(res) =>
						res.data.items as { id: number; department?: { name: string } }[],
				),
				map((infos) =>
					infos.map((info) => {
						const homonym = homonyms.find((h) => h.id === info.id);
						return {
							...homonym,
							additionalInformation: info.department
								? info.department.name
								: '',
						} as U;
					}),
				),
				catchError((err) => of([])),
			);
	}
	constructor(private _pipe: LuUserDisplayPipe, private _http: HttpClient) {
		super();
	}
}
