import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';

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

const template: StoryFn<RadioLegacyStory> = () => ({});

export const basic = template.bind({});
