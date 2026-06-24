import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
	DataTableBodyComponent,
	DataTableComponent,
	DataTableFootComponent,
	DataTableHeadComponent,
	DataTableRowCellComponent,
	DataTableRowCellHeaderComponent,
	DataTableRowComponent,
} from '@lucca-front/ng/data-table';
import { FancyBoxComponent } from '@lucca-front/ng/fancy-box';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextareaInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { HighlightDataComponent } from '@lucca-front/ng/highlight-data';
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
import { ResourceCardButtonComponent, ResourceCardComponent, ResourceCardLinkComponent } from '@lucca-front/ng/resource-card';

import {
	SkeletonButtonComponent,
	SkeletonCardComponent,
	SkeletonDataTableComponent,
	SkeletonFancyBoxComponent,
	SkeletonFieldComponent,
	SkeletonHeaderComponent,
	SkeletonHighlightDataComponent,
	SkeletonIndexTableComponent,
	SkeletonTableComponent,
	SkeletonUserPopoverComponent,
} from '@lucca-front/ng/skeleton';

import { ButtonComponent } from '@lucca/prisme/button';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'skeleton-components',
	templateUrl: './skeleton-components.stories.html',
	imports: [
		SkeletonButtonComponent,
		SkeletonFieldComponent,
		SkeletonHeaderComponent,
		SkeletonIndexTableComponent,
		SkeletonDataTableComponent,
		SkeletonTableComponent,
		IndexTableComponent,
		IndexTableHeadComponent,
		IndexTableRowComponent,
		IndexTableRowCellComponent,
		IndexTableRowCellHeaderComponent,
		SkeletonUserPopoverComponent,
		SkeletonCardComponent,
		SkeletonHighlightDataComponent,
		SkeletonFancyBoxComponent,
		ButtonComponent,
		FormFieldComponent,
		TextInputComponent,
		TextareaInputComponent,
		FormsModule,
		IndexTableActionComponent,
		IndexTableActionFileComponent,
		IndexTableBodyComponent,
		IndexTableFootComponent,
		IndexTableHeadComponent,
		IndexTableRowCellComponent,
		IndexTableRowCellHeaderComponent,
		IndexTableRowComponent,
		DataTableBodyComponent,
		DataTableComponent,
		DataTableFootComponent,
		DataTableHeadComponent,
		DataTableRowCellComponent,
		DataTableRowCellHeaderComponent,
		DataTableRowComponent,
		ResourceCardComponent,
		ResourceCardButtonComponent,
		ResourceCardLinkComponent,
		HighlightDataComponent,
		FancyBoxComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SkeletonComponentsStory {}

export default {
	title: 'QA/Skeleton Components',
	component: SkeletonComponentsStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<SkeletonComponentsStory> = {
	args: {},
	render: template,
};
