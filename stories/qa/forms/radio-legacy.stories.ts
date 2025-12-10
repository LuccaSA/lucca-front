import { Component } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'forms-radio-legacy-stories',
	templateUrl: './radio-legacy.stories.html',
})
class RadioLegacyStory {}

export default {
	title: 'QA/Forms/Radio Legacy',
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
