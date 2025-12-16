import { Component } from '@angular/core';
import { PaginationComponent } from '@lucca-front/ng/pagination';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'pagination-stories',
	templateUrl: './pagination.stories.html',
	imports: [PaginationComponent],
})
class PaginationStory {}

export default {
	title: 'QA/Pagination',
	component: PaginationStory,
} as Meta;

const template: StoryFn<PaginationStory> = () => ({});

export const Basic = template.bind({});
