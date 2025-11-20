import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, input } from '@angular/core';
import {
	DataTableBodyComponent,
	DataTableComponent,
	DataTableFootComponent,
	DataTableHeadComponent,
	DataTableRowCellComponent,
	DataTableRowCellHeaderComponent,
	DataTableRowComponent,
} from '@lucca-front/ng/data-table';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'data-table-draggable-stories',
	imports: [
		DataTableComponent,
		DataTableHeadComponent,
		DataTableBodyComponent,
		DataTableFootComponent,
		DataTableRowComponent,
		DataTableRowCellComponent,
		DataTableRowCellHeaderComponent,
		CdkDropList,
		CdkDrag,
	],
	templateUrl: './draggable.stories.html',
})
class DataTableDraggableStory {
	selectable = input<boolean>(false);

	listItem: Array<{ id: number; header: string; cell: string }> = [
		{ id: 1, header: 'Header 1', cell: 'cell 1' },
		{ id: 2, header: 'Header 2', cell: 'cell 2' },
		{ id: 3, header: 'Header 3', cell: 'cell 3' },
	];

	drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.listItem, event.previousIndex, event.currentIndex);
	}
}

export default {
	title: 'Documentation/Listings/Data table/Angular/Draggable',
	component: DataTableDraggableStory,
	argTypes: {
		selectable: {
			control: 'boolean',
		},
	},
} as Meta;

const template: StoryFn<DataTableDraggableStory> = (args) => ({
	props: args,
});

export const Basic = template.bind({});
Basic.args = {
	selectable: false,
};

const code = `<lu-data-table drag>
	<thead luDataTableHead>
		<tr luDataTableRow>
			<th luDataTableCell>Header</th>
			<th luDataTableCell>Cell</th>
		</tr>
	</thead>
	<tbody luDataTableBody cdkDropList (cdkDropListDropped)="drop($event)">
		<tr luDataTableRow selectedLabel="selectable" draggable cdkDrag>
			<th luDataTableCell>Header 1</th>
			<td luDataTableCell>cell 1</td>
		</tr>
	</tbody>
</lu-data-table>
`;

Basic.parameters = {
	docs: {
		source: {
			language: 'html',
			type: 'code',
			code,
		},
	},
};
