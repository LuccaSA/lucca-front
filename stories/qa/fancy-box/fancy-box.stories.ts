import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'fancy-box-stories',
	templateUrl: './fancy-box.stories.html',
})
class FancyBoxStory {}

export default {
	title: 'QA/Fancy box',
	component: FancyBoxStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<FancyBoxStory> = {
	args: {},
	render: template,
};
