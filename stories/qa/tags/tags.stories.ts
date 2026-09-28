import { PaletteAllArgType } from '@/helpers/common-arg-types';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
	DataTableBodyComponent,
	DataTableComponent,
	DataTableHeadComponent,
	DataTableRowCellComponent,
	DataTableRowCellHeaderComponent,
	DataTableRowComponent,
} from '@lucca-front/ng/data-table';
import {
	IndexTableActionComponent,
	IndexTableBodyComponent,
	IndexTableComponent,
	IndexTableHeadComponent,
	IndexTableRowCellComponent,
	IndexTableRowCellHeaderComponent,
	IndexTableRowComponent,
} from '@lucca-front/ng/index-table';
import { TagComponent } from '@lucca-front/ng/tag';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'tags-stories',
	templateUrl: './tags.stories.html',
	imports: [
		TagComponent,
		DataTableComponent,
		DataTableHeadComponent,
		DataTableBodyComponent,
		DataTableRowComponent,
		DataTableRowCellComponent,
		DataTableRowCellHeaderComponent,
		IndexTableComponent,
		IndexTableHeadComponent,
		IndexTableBodyComponent,
		IndexTableRowComponent,
		IndexTableRowCellComponent,
		IndexTableRowCellHeaderComponent,
		IndexTableActionComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TagsStory {
	paletteOptions = PaletteAllArgType.options;
}

export default {
	title: 'QA/Tags',
	component: TagsStory,
	decorators: [
		applicationConfig({
			providers: [provideRouter([{ path: 'iframe.html', redirectTo: '', pathMatch: 'full' }])],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<TagsStory> = {
	args: {},
	render: template,
};
