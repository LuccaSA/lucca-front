import { Component } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
	selector: 'forms-switch-stories',
	templateUrl: './switch.stories.html',
})
class SwitchStory {}

export default {
	title: 'QA/Forms/Switch',
	component: SwitchStory,
	decorators: [
		moduleMetadata({
			entryComponents: [SwitchStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<SwitchStory> = {
	args: {},
	render: template,
};
