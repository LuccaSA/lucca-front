import { Component, computed, forwardRef, inject, input, model, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { PortalContent } from '@lucca-front/ng/core';
import { LU_DATA_TABLE_INSTANCE } from '../data-table.token';
import { LU_DATA_TABLE_BODY_INSTANCE } from './data-table-body.token';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'tbody[luDataTableBody]',
	standalone: true,
	templateUrl: `./data-table-body.component.html`,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dataTable-body',
	},
	imports: [ButtonComponent],
	providers: [
		{
			provide: LU_DATA_TABLE_BODY_INSTANCE,
			useExisting: forwardRef(() => DataTableBodyComponent),
		},
	],
})
export class DataTableBodyComponent {
	group = input<PortalContent | null>(null);
	groupButtonAlt = input<string | null>(null);

	expanded = model(false);

	expandedToggle() {
		this.expanded.set(!this.expanded());
	}

	protected tableRef = inject(LU_DATA_TABLE_INSTANCE);

	colspan = computed(() => this.tableRef.cols().length + (this.tableRef.selectable() ? 1 : 0));
}
