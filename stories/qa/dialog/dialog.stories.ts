import { Component } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'dialog-stories',
	templateUrl: './dialog.stories.html',
})
class DialogStory {}

export default {
	title: 'QA/Dialog',
	component: DialogStory,
	decorators: [
		moduleMetadata({
			entryComponents: [DialogStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<DialogStory> = {
	args: {},
	render: template,
};
