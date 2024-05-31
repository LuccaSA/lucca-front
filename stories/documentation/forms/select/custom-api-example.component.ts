import { Directive } from '@angular/core';
import { LuCoreSelectApiV4Directive } from '@lucca-front/ng/core-select/api';

export interface Legume {
	id: number;
	name: string;
	color: string;
}

@Directive({
	selector: '[luLegumes]',
	standalone: true,
	exportAs: 'luLegumes',
})
export class LuCoreSelectLegumesDirective extends LuCoreSelectApiV4Directive<Legume> {
	public constructor() {
		super();
		this.apiV4 = '/api/legumes';
	}
}
