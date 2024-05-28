import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ILuApiCollectionResponse } from '@lucca-front/ng/api';
import { LuDisplayFormat, luUserDisplay } from '@lucca-front/ng/user';
import { Observable, map, of, startWith, tap } from 'rxjs';
import { LuCoreSelectUser } from './user-option.model';

@Injectable({ providedIn: 'root' })
export class LuCoreSelectUserHomonymsService {
	protected http = inject(HttpClient);
	protected cache: Record<number, string> = {};

	protected extractHomonyms<T extends LuCoreSelectUser>(users: T[], format: LuDisplayFormat): Set<T> {
		const usersByFullName: Record<string, T[]> = {};

		for (const user of users) {
			const name = luUserDisplay(user, format);
			usersByFullName[name] ||= [];
			usersByFullName[name].push(user);
		}

		return new Set(
			Object.values(usersByFullName)
				.filter((users) => users.length > 1)
				.flatMap((users) => users),
		);
	}

	public handleHomonyms<T extends LuCoreSelectUser>(users: T[], format: LuDisplayFormat): Observable<T[]> {
		const homonyms = this.extractHomonyms(users, format);

		if (homonyms.size === 0) {
			return of(users);
		}

		return this.getAdditionalInformationByUserId(Array.from(homonyms)).pipe(
			map((additionalInformation) => {
				return users.map((user) => {
					if (homonyms.has(user)) {
						return {
							...user,
							additionalInformation: this.cache[user.id] || additionalInformation[user.id],
						};
					}
					return user;
				});
			}),
			startWith(users),
		);
	}

	protected getAdditionalInformationByUserId<T extends LuCoreSelectUser>(homonyms: T[]): Observable<Record<number, string>> {
		const userIds = homonyms.map((user) => user.id).filter((id) => !this.cache[id]);

		if (userIds.length === 0) {
			return of({});
		}

		return this.http
			.get<ILuApiCollectionResponse<{ id: number; department?: { name: string } }>>(`/api/v3/users`, {
				params: {
					id: userIds.join(','),
					fields: 'id,department.name',
				},
			})
			.pipe(
				map((res) => res.data.items),
				map((infos) =>
					infos.reduce<Record<number, string>>(
						(acc, info) => ({
							...acc,
							[info.id]: info.department?.name || '',
						}),
						{},
					),
				),
				tap((infos) => {
					this.cache = {
						...this.cache,
						...infos,
					};
				}),
			);
	}
}
