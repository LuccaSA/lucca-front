import { Component } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'section-stories',
	templateUrl: './section.stories.html',
})
class SectionStory {}

export default {
	title: 'QA/Section',
	component: SectionStory,
} as Meta;

const template: StoryFn<SectionStory> = () => ({});

export const Basic = template.bind({});
