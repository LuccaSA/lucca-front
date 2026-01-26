import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaginationComponent } from '@lucca-front/ng/pagination';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'pagination-stories',
	templateUrl: './pagination.stories.html',
	imports: [PaginationComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class PaginationStory {}

export default {
	title: 'QA/Pagination',
	component: PaginationStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<PaginationStory> = {
	args: {},
	render: template,
};
