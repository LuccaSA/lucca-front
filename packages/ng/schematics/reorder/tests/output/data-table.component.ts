import { CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { DataTableBodyComponent, DataTableComponent, DataTableRowCellComponent, DataTableRowComponent } from '@lucca-front/ng/data-table';
import { ReorderDirective, ReorderEvent } from '@lucca-front/ng/reorder';

interface Employee {
	name: string;
}

@Component({
	selector: 'app-data-table',
	imports: [DataTableComponent, DataTableBodyComponent, DataTableRowComponent, DataTableRowCellComponent, CdkDropList, CdkDrag, ReorderDirective],
	templateUrl: './data-table.component.html',
})
export class DataTableExampleComponent {
	employees: Employee[] = [];

	onDrop({ previousIndex, currentIndex }: ReorderEvent<Employee[]>): void {
		moveItemInArray(this.employees, previousIndex, currentIndex);
	}
}
