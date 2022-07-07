import { Component } from '@angular/core';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'forms-textfields-stories',
	templateUrl: './textfields.stories.html',
	styles: [
		'.demo-white { background: #F5F5F5; display: inline-block; padding: var(--spacings-smaller) var(--spacings-small); border-radius: 3px;}',
		'.demo-invert { background: #444; display: inline-block; padding: var(--spacings-smaller) var(--spacings-small); margin: 0 var(--spacings-smaller); border-radius: 3px; }',
	],
})
class TextfieldsStory {}

export default {
	title: 'QA/Forms/Textfields',
	component: TextfieldsStory,
	decorators: [
		moduleMetadata({
			entryComponents: [TextfieldsStory],
		}),
	],
} as Meta;

const template: Story<TextfieldsStory> = () => ({});

export const basic = template.bind({});
