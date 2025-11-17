import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
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
} as Meta;

const template: StoryFn<DataTableDraggableStory> = (args) => ({
	props: args,
});

export const Basic = template.bind({});

const code = ``;

Basic.parameters = {
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
