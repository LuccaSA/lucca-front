import { Component } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
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

const template: Story<GaugeStory> = () => ({});

export const basic = template.bind({});
