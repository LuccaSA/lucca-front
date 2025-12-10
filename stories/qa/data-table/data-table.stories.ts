import { Component } from '@angular/core';
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
})
class DataTableStory {}

export default {
	title: 'QA/DataTable',
	component: DataTableStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<DataTableStory> = {
	args: {},
	render: template,
};
