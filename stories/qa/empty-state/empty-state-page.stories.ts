import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'empty-state-page-stories',
	styleUrls: ['empty-state-page.stories.scss'],
	templateUrl: './empty-state-page.stories.html',
})
class EmptyStatePageStory {}

export default {
	title: 'QA/Empty State/Page',
	component: EmptyStatePageStory,
} as Meta;

const template: StoryFn<EmptyStatePageStory> = () => ({});

export const basic = template.bind({});
