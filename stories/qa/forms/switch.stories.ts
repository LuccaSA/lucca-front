import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'forms-switch-stories',
	templateUrl: './switch.stories.html'
}) class SwitchStory {}

export default {
  title: 'QA/Forms/Switch',
  component: SwitchStory,
	decorators: [
		moduleMetadata({
			entryComponents: [SwitchStory]
		})
	]
} as Meta;

const template: Story<SwitchStory> = () => ({});

export const basic = template.bind({});
