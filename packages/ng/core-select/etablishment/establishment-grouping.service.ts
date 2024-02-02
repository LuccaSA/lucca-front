import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { combineLatest, map, shareReplay } from 'rxjs';
import { LuCoreSelectLegalUnit } from './models';

@Injectable({ providedIn: 'root' })
export class EstablishmentGroupingService {
	protected http = inject(HttpClient);
	protected establishmentsUrl = '/organization/structure/api/establishments';
	protected legalUnitsUrl = '/organization/structure/api/legal-units';

	protected countParams: HttpParams = new HttpParams().set('fields.root', 'count').set('limit=0', 0);
	protected establishmentsCount$ = this.http.get<{ count: number }>(this.establishmentsUrl, { params: this.countParams }).pipe(map((res) => res.count));
	protected legalUnitsCount$ = this.http.get<{ count: number }>(this.legalUnitsUrl, { params: this.countParams }).pipe(map((res) => res.count));

	public useGrouping$ = combineLatest([this.legalUnitsCount$, this.establishmentsCount$]).pipe(
		map(([luCount, establishmentCount]) => luCount > 1 && establishmentCount > 1 && luCount !== establishmentCount),
		shareReplay(),
	);

	public legalUnits$ = this.http.get<{ items: LuCoreSelectLegalUnit[] }>(this.legalUnitsUrl).pipe(
		map((res) => res.items),
		shareReplay(),
	);
}
