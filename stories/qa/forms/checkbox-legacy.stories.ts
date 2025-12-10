import { Component } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
	selector: 'forms-checkbox-legacy-stories',
	templateUrl: './checkbox-legacy.stories.html',
})
class CheckboxLegacyStory {}

export default {
	title: 'QA/Forms/CheckboxLegacy',
	component: CheckboxLegacyStory,
	decorators: [
		moduleMetadata({
			entryComponents: [CheckboxLegacyStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<CheckboxLegacyStory> = {
	args: {},
	render: template,
};
