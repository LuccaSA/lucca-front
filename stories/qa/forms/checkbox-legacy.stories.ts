import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'forms-checkbox-legacy-stories',
	templateUrl: './checkbox-legacy.stories.html',
})
class CheckboxLegacyStory {}

export default {
	title: 'QA/Forms/Checkbox Legacy',
	component: CheckboxLegacyStory,
	decorators: [
		moduleMetadata({
			entryComponents: [CheckboxLegacyStory],
		}),
	],
} as Meta;

const template: StoryFn<CheckboxLegacyStory> = () => ({});

export const basic = template.bind({});
