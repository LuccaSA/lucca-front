import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { DataTableBodyComponent, DataTableComponent, DataTableRowCellComponent, DataTableRowComponent } from '@lucca-front/ng/data-table';

interface Employee {
	name: string;
}

@Component({
	selector: 'app-data-table',
	imports: [DataTableComponent, DataTableBodyComponent, DataTableRowComponent, DataTableRowCellComponent, CdkDropList, CdkDrag],
	templateUrl: './data-table.component.html',
})
export class DataTableExampleComponent {
	employees: Employee[] = [];

	onDrop({ previousIndex, currentIndex }: CdkDragDrop<Employee[]>): void {
		moveItemInArray(this.employees, previousIndex, currentIndex);
	}
}
