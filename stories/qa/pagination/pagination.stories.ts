import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

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

const template = () => ({});

export const Basic: StoryObj<PaginationStory> = {
	args: {},
	render: template,
};
