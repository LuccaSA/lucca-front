import { booleanAttribute, Component, computed, contentChildren, forwardRef, input, ViewEncapsulation } from '@angular/core';
import { LU_DATA_TABLE_INSTANCE } from './data-table.token';
import { DataTableRowComponent } from './dataTableRow/dataTableRow.component';

@Component({
	selector: 'lu-data-table',
	standalone: true,
	templateUrl: './data-table.component.html',
	styleUrl: './data-table.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dataTableWrapper',
	},
	providers: [
		{
			provide: LU_DATA_TABLE_INSTANCE,
			useExisting: forwardRef(() => DataTableComponent),
		},
	],
})
export class DataTableComponent {
	stickyHeader = input(false, { transform: booleanAttribute });
	hover = input(false, { transform: booleanAttribute });
	selectable = input(false, { transform: booleanAttribute });
	layoutFixed = input(false, { transform: booleanAttribute });
	cellBorder = input(false, { transform: booleanAttribute });

	rows = contentChildren(DataTableRowComponent, { descendants: true });

	firstRow = computed(() => {
		return this.rows().find((row) => !!row.bodyRef);
	});

	// TODO:
	// stocker la référence de l’observer en cours
	// dans un effect faire un intersectionObserver sur firstRow
	// mettre la classe is-firstBodyRowVisible sur firstRow
}
