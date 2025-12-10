import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'skip-links-stories',
	templateUrl: './skip-links.stories.html',
})
class SkipLinksStory {}

export default {
	title: 'QA/SkipLinks',
	component: SkipLinksStory,
} as Meta;

const template = () => ({});

export const basic: StoryObj<SkipLinksStory> = {
	args: {},
	render: template,
};
