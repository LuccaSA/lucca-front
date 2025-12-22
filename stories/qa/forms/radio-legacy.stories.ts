import { Component } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
	selector: 'forms-radio-legacy-stories',
	templateUrl: './radio-legacy.stories.html',
})
class RadioLegacyStory {}

export default {
	title: 'QA/Forms/RadioLegacy',
	component: RadioLegacyStory,
	decorators: [
		moduleMetadata({
			entryComponents: [RadioLegacyStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<RadioLegacyStory> = {
	args: {},
	render: template,
};
