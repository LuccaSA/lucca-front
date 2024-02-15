import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';

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

const template: StoryFn<SwitchLegacyStory> = () => ({});

export const basic = template.bind({});
