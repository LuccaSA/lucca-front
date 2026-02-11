import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
	selector: 'dialog-stories',
	templateUrl: './dialog.stories.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
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
