import { Component } from '@angular/core';
import { GaugeComponent } from '@lucca-front/ng/gauge';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'gauge-stories',
	templateUrl: './gauge.stories.html',
	imports: [GaugeComponent],
})
class GaugeStory {}

export default {
	title: 'QA/Gauge',
	component: GaugeStory,
} as Meta;

const template: StoryFn<GaugeStory> = () => ({});

export const basic = template.bind({});
