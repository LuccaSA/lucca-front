import { Component } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'forms-switches-stories',
	templateUrl: './switches.stories.html'
}) class SwitchesStory {}

export default {
  title: 'QA/Forms/Switches',
  component: SwitchesStory,
	decorators: [
		moduleMetadata({
			entryComponents: [SwitchesStory]
		})
	]
} as Meta;

const template: StoryFn<SwitchesStory> = () => ({});

export const basic = template.bind({});
