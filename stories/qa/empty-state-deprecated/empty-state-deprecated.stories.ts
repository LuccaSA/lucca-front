import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'empty-state-deprecated-stories',
	templateUrl: './empty-state-deprecated.stories.html',
})
class EmptyStateDeprecatedBasicStory {}

export default {
	title: 'QA/Empty State Deprecated/Basic',
	component: EmptyStateDeprecatedBasicStory,
} as Meta;

const template: StoryFn<EmptyStateDeprecatedBasicStory> = () => ({});

export const basic = template.bind({});
