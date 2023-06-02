import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'pagination-stories',
	templateUrl: './pagination.stories.html',
})
class PaginationStory {}

export default {
	title: 'QA/Pagination',
	component: PaginationStory,
} as Meta;

const template: StoryFn<PaginationStory> = () => ({});

export const basic = template.bind({});
