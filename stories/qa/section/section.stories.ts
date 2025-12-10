import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'section-stories',
	templateUrl: './section.stories.html',
})
class SectionStory {}

export default {
	title: 'QA/Section',
	component: SectionStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<SectionStory> = {
	args: {},
	render: template,
};
