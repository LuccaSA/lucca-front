import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'box-stories',
	templateUrl: './box.stories.html',
})
class BoxStory {}

export default {
	title: 'QA/Box',
	component: BoxStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<BoxStory> = {
	args: {},
	render: template,
};
