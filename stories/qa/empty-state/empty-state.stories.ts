import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'empty-state-stories',
	templateUrl: './empty-state.stories.html',
})
class EmptyStateStory {}

export default {
	title: 'QA/Empty State',
	component: EmptyStateStory,
} as Meta;

const template: StoryFn<EmptyStateStory> = () => ({});

export const basic = template.bind({});
