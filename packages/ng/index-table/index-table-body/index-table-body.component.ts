import { ChangeDetectionStrategy, Component, computed, contentChild, forwardRef, inject, input, model, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LU_INDEX_TABLE_INSTANCE } from '../index-table.token';
import { LU_INDEX_TABLE_BODY_INSTANCE } from './index-table-body.token';
import { IndexTableBodyGroupDirective } from './index-table-body-group.directive';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'tbody[luIndexTableBody]',
	standalone: true,
	templateUrl: `./index-table-body.component.html`,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'indexTable-body',
	},
	imports: [ButtonComponent, IconComponent, PortalDirective],
	providers: [
		{
			provide: LU_INDEX_TABLE_BODY_INSTANCE,
			useExisting: forwardRef(() => IndexTableBodyComponent),
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexTableBodyComponent {
	readonly group = input<PortalContent | null>(null);
	readonly groupButtonAlt = input<string | null>(null);

	readonly expanded = model(false);

	protected readonly groupSlot = contentChild(IndexTableBodyGroupDirective, { descendants: false });

	expandedToggle() {
		this.expanded.set(!this.expanded());
	}

	protected tableRef = inject(LU_INDEX_TABLE_INSTANCE);

	readonly colspan = computed(() => (this.tableRef.cols()?.length ?? 0) + (this.tableRef.selectable() ? 1 : 0));
}
