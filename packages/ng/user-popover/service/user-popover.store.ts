import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { ILuUserPopoverStore } from './user-popover-service.model';
import { LuUserPopover } from '../user-popover.model';

@Injectable({
	providedIn: 'root',
})
export class LuUserPopoverStore implements ILuUserPopoverStore {
	#http = inject(HttpClient);
	#cache = new Map<number, Observable<LuUserPopover>>();
	protected _api = '/work-locations/api/employee-profile-card';

	public get(id: number): Observable<LuUserPopover> {
		if (this.#cache.has(id)) {
			return this.#cache.get(id)!;
		}
		const userPopoverObservable = this.#http.get<LuUserPopover>(`${this._api}/${id}`).pipe(
			cacheImage((c) => c.pictureHref),
			shareReplay(1),
		);

		this.#cache.set(id, userPopoverObservable);
		return userPopoverObservable;
	}

	public clearCache(userId?: number) {
		if (userId) {
			this.#cache.delete(userId);
		} else {
			this.#cache.clear();
		}
	}
}

export function cacheImage<T>(accessor: (value: T) => string | undefined): OperatorFunction<T, T> {
	return (source: Observable<T>): Observable<T> =>
		new Observable((subscriber) => {
			source.subscribe({
				next(value) {
					const imagePath = accessor(value);
					if (!imagePath) {
						subscriber.next(value);
					}
					const img = new Image();
					img.src = imagePath!;
					img.onload = () => {
						subscriber.next(value);
					};
					img.onerror = () => {
						subscriber.next(value);
					};
				},
			});
		});
}
