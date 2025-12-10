import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'links-stories',
	templateUrl: './links.stories.html',
})
class LinksStory {}

export default {
	title: 'QA/Links',
	component: LinksStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<LinksStory> = {
	args: {},
	render: template,
};
