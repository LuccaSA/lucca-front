import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'colors-stories',
	templateUrl: './colors.stories.html',
})
class ColorsStory {}

export default {
	title: 'QA/Colors',
	component: ColorsStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<ColorsStory> = {
	args: {},
	render: template,
};
