import { Component } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'forms-radios-stories',
	templateUrl: './radios.stories.html'
}) class RadiosStory {}

export default {
  title: 'QA/Forms/Radios',
  component: RadiosStory,
	decorators: [
		moduleMetadata({
			entryComponents: [RadiosStory]
		})
	]
} as Meta;

const template: StoryFn<RadiosStory> = () => ({});

export const basic = template.bind({});
