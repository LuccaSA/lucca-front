import { Component } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
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

const template: StoryFn<ListStory> = () => ({});

export const basic = template.bind({});
