import { Component } from '@angular/core';
import { Meta } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'segmented-control-stories',
	templateUrl: './segmented-control.stories.html',
	styles: ['.numericBadge.is-loading::after { animation-play-state: paused; }'],
})
class SegmentedControlStory {}

export default {
	title: 'QA/Segmented Control',
	component: SegmentedControlStory,
} as Meta;

export const Basic = {};
