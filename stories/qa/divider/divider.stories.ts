import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'divider-stories',
	templateUrl: './divider.stories.html',
})
class DividerStory {}

export default {
	title: 'QA/Divider',
	component: DividerStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<DividerStory> = {
	args: {},
	render: template,
};
