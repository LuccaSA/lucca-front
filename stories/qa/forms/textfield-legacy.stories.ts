import { Component } from '@angular/core';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'forms-textfield-legacy-stories',
	templateUrl: './textfield-legacy.stories.html',
	styles: [
		'.demo-white { background: #F5F5F5; display: inline-block; padding: var(--pr-t-spacings-100) var(--pr-t-spacings-200); border-radius: 3px;}',
		'.demo-invert { background: #444; display: inline-block; padding: var(--pr-t-spacings-100) var(--pr-t-spacings-200); margin: 0 var(--pr-t-spacings-100); border-radius: 3px; }',
	],
})
class TextfieldLegacyStory {}

export default {
	title: 'QA/Forms/Textfield Legacy',
	component: TextfieldLegacyStory,
	decorators: [
		moduleMetadata({
			entryComponents: [TextfieldLegacyStory],
		}),
	],
} as Meta;

const template: StoryFn<TextfieldLegacyStory> = () => ({});

export const basic = template.bind({});
