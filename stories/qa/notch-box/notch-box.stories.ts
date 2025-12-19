import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'notchbox-stories',
	templateUrl: './notch-box.stories.html',
})
class NotchBoxStory {}

export default {
	title: 'QA/NotchBox',
	component: NotchBoxStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<NotchBoxStory> = {
	args: {},
	render: template,
};
