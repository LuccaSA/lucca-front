import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'forms-stories',
	templateUrl: './forms.stories.html',
}) class FormsStory {}

export default {
  title: 'QA/Forms',
  component: FormsStory,
	decorators: [
		moduleMetadata({
			entryComponents: [FormsStory]
		})
	]
} as Meta;

const template: Story<FormsStory> = () => ({});

export const basic = template.bind({});
