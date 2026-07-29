import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlTabsComponent, SegmentedControlTabsPanelComponent } from '@lucca-front/ng/segmented-control-tabs';
import { Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'segmented-control-tabs-stories',
	templateUrl: './segmented-control-tabs.stories.html',
	imports: [SegmentedControlTabsComponent, SegmentedControlTabsPanelComponent, NumericBadgeComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SegmentedControlTabsStory {}

export default {
	title: 'QA/SegmentedControlTabs',
	component: SegmentedControlTabsStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<SegmentedControlTabsStory> = {
	args: {},
	render: template,
};
