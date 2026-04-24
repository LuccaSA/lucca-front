import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IndexTableComponent, IndexTableHeadComponent, IndexTableRowCellComponent, IndexTableRowCellHeaderComponent, IndexTableRowComponent } from '@lucca-front/ng/index-table';
import {
	SkeletonButtonComponent,
	SkeletonDataTableComponent,
	SkeletonFieldComponent,
	SkeletonHeaderComponent,
	SkeletonIndexTableComponent,
	SkeletonTableComponent,
	SkeletonUserPopoverComponent,
} from '@lucca-front/ng/skeleton';
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
