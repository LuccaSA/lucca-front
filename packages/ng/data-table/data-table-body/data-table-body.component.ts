import { ChangeDetectionStrategy, Component, computed, forwardRef, inject, input, model, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LU_DATA_TABLE_INSTANCE } from '../data-table.token';
import { LU_DATA_TABLE_BODY_INSTANCE } from './data-table-body.token';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'tbody[luDataTableBody]',
	templateUrl: `./data-table-body.component.html`,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dataTable-body',
	},
	imports: [ButtonComponent, PortalDirective, IconComponent],
	providers: [
		{
			provide: LU_DATA_TABLE_BODY_INSTANCE,
			useExisting: forwardRef(() => DataTableBodyComponent),
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableBodyComponent {
	readonly group = input<PortalContent | null>(null);
	readonly groupButtonAlt = input<string | null>(null);

	readonly expanded = model(false);

	expandedToggle() {
		this.expanded.set(!this.expanded());
	}

	protected tableRef = inject(LU_DATA_TABLE_INSTANCE, { optional: true });

	readonly colspan = computed(() => {
		if (!this.tableRef) {
			return 0;
		}

		return (this.tableRef.cols()?.length ?? 0) + (this.tableRef?.selectable() ? 1 : 0);
	});
}
