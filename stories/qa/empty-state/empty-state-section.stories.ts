import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'empty-state-section-stories',
	templateUrl: './empty-state-section.stories.html',
})
class EmptyStateSectionStory {}

export default {
	title: 'QA/Empty State/Section',
	component: EmptyStateSectionStory,
} as Meta;

const template: StoryFn<EmptyStateSectionStory> = () => ({});

export const basic = template.bind({});
