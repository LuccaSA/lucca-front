import { Component, inject } from '@angular/core';
import { PORTAL_CONTEXT } from '@lucca-front/ng/core';
import { LuOptionGroupByContext } from '@lucca-front/ng/core-select';
import { LuCoreSelectEstablishment } from './models';

@Component({
	selector: 'lu-establishment-grouping',
	template: `{{ group.options[0].legalUnit.name }}`,
})
export class LuEstablishmentGroupingComponent {
	group = inject<LuOptionGroupByContext<LuCoreSelectEstablishment, number>>(PORTAL_CONTEXT).$implicit;
}
