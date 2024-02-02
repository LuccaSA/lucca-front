import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PORTAL_CONTEXT } from '@lucca-front/ng/core';
import { map } from 'rxjs';
import { LuOptionGroupByContext } from '../select.model';
import { EstablishmentGroupingService } from './establishment-grouping.service';

@Component({
	selector: 'lu-establishment-grouping',
	standalone: true,
	imports: [AsyncPipe],
	template: `{{ (legalUnit$ | async)?.name }}`,
})
export class LuEstablishmentGroupingComponent<TOption, TGroup> {
	#groupingService = inject(EstablishmentGroupingService);

	#group = inject<LuOptionGroupByContext<TOption, TGroup>>(PORTAL_CONTEXT).$implicit;

	legalUnit$ = this.#groupingService.legalUnits$.pipe(map((legalUnits) => legalUnits.find((lu) => lu.id === this.#group.key)));
}
