import { Component } from '@angular/core';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'gauge-stories',
	templateUrl: './gauge.stories.html',
})
class GaugeStory {}

export default {
	title: 'QA/Gauge',
	component: GaugeStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<GaugeStory> = {
	args: {},
	render: template,
};
