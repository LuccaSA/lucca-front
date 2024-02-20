import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { ILuEmployeeCardStore } from './employee-service.model';
import { LuEmployeeCard } from '../employee.model';

@Injectable({
	providedIn: 'root',
})
export class LuEmployeeCardStore implements ILuEmployeeCardStore {
	#http = inject(HttpClient);
	#cache = new Map<number, Observable<LuEmployeeCard>>();
	protected _api = '/work-locations/api/employee-profile-card';

	public get(id: number): Observable<LuEmployeeCard> {
		if (this.#cache.has(id)) {
			return this.#cache.get(id)!;
		}
		const employeeCard$ = this.#http.get<LuEmployeeCard>(`${this._api}/${id}`).pipe(
			// cacheImage((c) => c.pictureHref),
			shareReplay(1),
		);
		this.#cache.set(id, employeeCard$);
		return employeeCard$;
	}

	public clearCache(userId?: number) {
		if (userId) {
			this.#cache.delete(userId);
		} else {
			this.#cache.clear();
		}
	}
}
