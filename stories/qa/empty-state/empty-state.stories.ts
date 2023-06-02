import { Component } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'empty-state-stories',
	templateUrl: './empty-state.stories.html',
}) class EmptyStateStory {}

export default {
  title: 'QA/Empty State',
  component: EmptyStateStory,
	decorators: [
		moduleMetadata({
			entryComponents: [EmptyStateStory]
		})
	]
} as Meta;

const template: StoryFn<EmptyStateStory> = () => ({});

export const basic = template.bind({});
