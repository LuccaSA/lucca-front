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
	imports: [DataTableComponent, DataTableHeadComponent, DataTableBodyComponent, DataTableFootComponent, DataTableRowComponent, DataTableRowCellComponent, DataTableRowCellHeaderComponent],
	templateUrl: './draggable.stories.html',
})
class DataTableDraggableStory {}

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
