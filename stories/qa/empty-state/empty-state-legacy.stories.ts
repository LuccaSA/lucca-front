import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'empty-state-legacy-stories',
	templateUrl: './empty-state-legacy.stories.html',
})
class EmptyStateLegacyStory {}

export default {
	title: 'QA/Empty State/Legacy',
	component: EmptyStateLegacyStory,
} as Meta;

const template: StoryFn<EmptyStateLegacyStory> = () => ({});

export const basic = template.bind({});
