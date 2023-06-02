import { Component } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'pagination-stories',
	templateUrl: './pagination.stories.html',
}) class PaginationStory {}

export default {
  title: 'QA/Pagination',
  component: PaginationStory,
	decorators: [
		moduleMetadata({
			entryComponents: [PaginationStory]
		})
	]
} as Meta;

const template: StoryFn<PaginationStory> = () => ({});

export const basic = template.bind({});
