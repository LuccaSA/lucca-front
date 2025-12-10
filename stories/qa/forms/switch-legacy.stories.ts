import { Component } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'forms-switch-legacy-stories',
	templateUrl: './switch-legacy.stories.html',
})
class SwitchLegacyStory {}

export default {
	title: 'QA/Forms/Switch Legacy',
	component: SwitchLegacyStory,
	decorators: [
		moduleMetadata({
			entryComponents: [SwitchLegacyStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<SwitchLegacyStory> = {
	args: {},
	render: template,
};
