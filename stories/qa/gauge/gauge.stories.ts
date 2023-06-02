import { Component } from '@angular/core';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'gauge-stories',
	templateUrl: './gauge.stories.html',
}) class GaugeStory {}

export default {
  title: 'QA/Gauge',
  component: GaugeStory,
	decorators: [
		moduleMetadata({
			entryComponents: [GaugeStory]
		})
	]
} as Meta;

const template: StoryFn<GaugeStory> = () => ({});

export const basic = template.bind({});
