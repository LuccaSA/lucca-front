import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta } from '@storybook/angular';

@Component({
	selector: 'segmented-control-stories',
	templateUrl: './segmented-control.stories.html',
	styles: ['.numericBadge.is-loading::after { animation-play-state: paused; }'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SegmentedControlStory {}

export default {
	title: 'QA/SegmentedControl',
	component: SegmentedControlStory,
} as Meta;

export const Basic = {};
