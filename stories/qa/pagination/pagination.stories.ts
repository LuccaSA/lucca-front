import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
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

const template: Story<PaginationStory> = () => ({});

export const basic = template.bind({});
