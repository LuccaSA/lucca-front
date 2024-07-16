import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';

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

const template: StoryFn<DialogStory> = () => ({});

export const basic = template.bind({});
