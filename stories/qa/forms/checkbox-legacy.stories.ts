import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';

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

const template: StoryFn<CheckboxLegacyStory> = () => ({});

export const Basic = template.bind({});
