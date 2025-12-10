import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';

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

const template: StoryFn<RadioLegacyStory> = () => ({});

export const Basic = template.bind({});
