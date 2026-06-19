import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import {
	DataTableBodyComponent,
	DataTableComponent,
	DataTableFootComponent,
	DataTableHeadComponent,
	DataTableRowCellComponent,
	DataTableRowCellHeaderComponent,
	DataTableRowComponent,
} from '@lucca-front/ng/data-table';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { PaginationComponent } from '@lucca-front/ng/pagination';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuUserPictureComponent } from '@lucca-front/ng/user';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'data-table-stories',
	templateUrl: './data-table.stories.html',
	imports: [
		DataTableComponent,
		DataTableHeadComponent,
		DataTableBodyComponent,
		DataTableFootComponent,
		DataTableRowComponent,
		DataTableRowCellComponent,
		DataTableRowCellHeaderComponent,
		FormFieldComponent,
		TextInputComponent,
		FormsModule,
		ButtonComponent,
		IconComponent,
		PaginationComponent,
		NumericBadgeComponent,
		StatusBadgeComponent,
		TagComponent,
		LuUserPictureComponent,
		CdkDropList,
		CdkDrag,
		EmptyStateSectionComponent,
	],
	styles: [
		`
			.dataTable:has(.mod-stickyColumn),
			.mod-columnsOverflow {
				white-space: nowrap;
			}
			.dataTableWrapper {
				margin-block-end: var(--pr-t-spacings-100);
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DataTableStory {
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
	title: 'QA/DataTable',
	component: DataTableStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<DataTableStory> = {
	args: {},
	render: template,
};
