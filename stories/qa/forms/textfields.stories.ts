import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'forms-textfields-stories',
	templateUrl: './textfields.stories.html',
	styles: ['.demo-white { background: #F5F5F5; display: inline-block; padding: .5rem 1rem; border-radius: 3px;}', '.demo-invert { background: #444; display: inline-block; padding: .5rem 1rem; margin: 0 .5rem; border-radius: 3px; }']
}) class TextfieldsStory {}

export default {
  title: 'QA/Forms/Textfields',
  component: TextfieldsStory,
	decorators: [
		moduleMetadata({
			entryComponents: [TextfieldsStory]
		})
	]
} as Meta;

const template: Story<TextfieldsStory> = () => ({});

export const basic = template.bind({});
