import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ILuApiCollectionResponse } from '@lucca-front/ng/api';
import { LuDisplayFormat, luUserDisplay } from '@lucca-front/ng/user';
import { Observable, combineLatest, map, of, shareReplay, startWith, tap } from 'rxjs';
import { LuCoreSelectUser } from './user-option.model';

@Injectable({ providedIn: 'root' })
export class LuCoreSelectUserHomonymsService {
	protected http = inject(HttpClient);
	protected cache: Record<number, string> = {};

	protected extractHomonyms<T extends LuCoreSelectUser>(users: readonly T[], format: LuDisplayFormat): Set<T['id']> {
		const usersByFullName: Record<string, T[]> = {};

		for (const user of users) {
			const name = luUserDisplay(user, format);
			usersByFullName[name] ||= [];
			usersByFullName[name].push(user);
		}

		return new Set(
			Object.values(usersByFullName)
				.filter((users) => users.length > 1)
				.flatMap((users) => users.map((user) => user.id)),
		);
	}

	public handleHomonyms<T extends LuCoreSelectUser>(users: readonly T[], format: LuDisplayFormat): Observable<readonly T[]> {
		const homonyms = this.extractHomonyms(users, format);

		if (homonyms.size === 0) {
			return of(users);
		}

		return this.getAdditionalInformationByUserId(Array.from(homonyms)).pipe(
			map((additionalInformation) =>
				users.map((user) =>
					homonyms.has(user.id)
						? {
								...user,
								additionalInformation: additionalInformation[user.id] ?? this.cache[user.id],
							}
						: user,
				),
			),
			startWith(users),
		);
	}

	protected getAdditionalInformationByUserId<T extends LuCoreSelectUser>(homonyms: T['id'][]): Observable<Record<number, string>> {
		// Users without department are cached as an empty string, so `hasOwn` is required to consider them as known
		const unknownIds = homonyms.filter((userId) => !Object.hasOwn(this.cache, userId));
		const idsToFetch = unknownIds.filter((userId) => !this.#pendingRequests.has(userId));

		if (idsToFetch.length > 0) {
			const request$ = this.fetchAdditionalInformation(idsToFetch).pipe(shareReplay(1));
			idsToFetch.forEach((userId) => this.#pendingRequests.set(userId, request$));
		}

		const requests = Array.from(new Set(unknownIds.map((userId) => this.#pendingRequests.get(userId)).filter((request) => !!request)));

		if (requests.length === 0) {
			return of({});
		}

		return combineLatest(requests).pipe(map((infos) => Object.assign({}, ...infos) as Record<number, string>));
	}

	#pendingRequests = new Map<number, Observable<Record<number, string>>>();

	private fetchAdditionalInformation(userIds: number[]): Observable<Record<number, string>> {
		return this.http
			.get<ILuApiCollectionResponse<{ id: number; department?: { name: string } }>>(`/api/v3/users`, {
				params: {
					id: userIds.join(','),
					fields: 'id,department.name',
				},
			})
			.pipe(
				map((res) => res.data.items),
				map((infos) => {
					// Ids missing from the response are cached as well, to never fetch them again
					const additionalInformation: Record<number, string> = Object.fromEntries(userIds.map((userId) => [userId, '']));
					infos.forEach((info) => (additionalInformation[info.id] = info.department?.name || ''));
					return additionalInformation;
				}),
				tap((infos) => {
					this.cache = {
						...this.cache,
						...infos,
					};
					userIds.forEach((userId) => this.#pendingRequests.delete(userId));
				}),
			);
	}
}
