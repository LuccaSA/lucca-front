import { Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import {
	IndexTableActionComponent,
	IndexTableActionFileComponent,
	IndexTableBodyComponent,
	IndexTableComponent,
	IndexTableFootComponent,
	IndexTableHeadComponent,
	IndexTableRowCellComponent,
	IndexTableRowCellHeaderComponent,
	IndexTableRowComponent,
} from '@lucca-front/ng/index-table';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { PaginationComponent } from '@lucca-front/ng/pagination';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuUserPictureComponent } from '@lucca-front/ng/user';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'index-table-stories',
	templateUrl: './index-table.stories.html',
	imports: [
		StatusBadgeComponent,
		TagComponent,
		LuUserPictureComponent,
		ButtonComponent,
		NumericBadgeComponent,
		IconComponent,
		IndexTableComponent,
		IndexTableBodyComponent,
		IndexTableRowComponent,
		IndexTableRowCellComponent,
		IndexTableRowCellHeaderComponent,
		IndexTableHeadComponent,
		IndexTableFootComponent,
		IndexTableActionComponent,
		IndexTableActionFileComponent,
		PaginationComponent,
		ButtonComponent,
	],
})
class IndexTableStory {}

export default {
	title: 'QA/IndexTable',
	component: IndexTableStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<IndexTableStory> = {
	args: {},
	render: template,
};
