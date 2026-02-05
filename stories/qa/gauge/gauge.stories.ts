import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GaugeComponent } from '@lucca-front/ng/gauge';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'gauge-stories',
	templateUrl: './gauge.stories.html',
	imports: [GaugeComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
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
