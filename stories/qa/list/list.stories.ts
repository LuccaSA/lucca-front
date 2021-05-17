import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'list-stories',
	templateUrl: './list.stories.html',
}) class ListStory {}

export default {
  title: 'QA/List',
  component: ListStory,
	decorators: [
		moduleMetadata({
			entryComponents: [ListStory]
		})
	]
} as Meta;

const template: Story<ListStory> = () => ({});

export const basic = template.bind({});
