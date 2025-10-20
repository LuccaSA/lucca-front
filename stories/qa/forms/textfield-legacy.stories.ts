import { Component } from '@angular/core';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

@Component({
	selector: 'forms-textfield-legacy-stories',
	templateUrl: './textfield-legacy.stories.html',
	styles: [
		'.demo-white { background: #F5F5F5; display: inline-block; padding-block: var(--pr-t-spacings-100); padding-inline: var(--pr-t-spacings-200); border-radius: var(--pr-t-border-radius-50);}',
		'.demo-invert { background: #444; display: inline-block; padding-block: var(--pr-t-spacings-100); padding-inline: var(--pr-t-spacings-200); margin-block: 0; margin-inline: var(--pr-t-spacings-100); border-radius: var(--pr-t-border-radius-50); }',
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
