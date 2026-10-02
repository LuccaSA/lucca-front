import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
import { Meta } from '@storybook/angular-vite';

@Component({
	selector: 'segmented-control-stories',
	templateUrl: './segmented-control.stories.html',
	styles: ['.numericBadge.is-loading::after { animation-play-state: paused; }'],
	imports: [SegmentedControlComponent, SegmentedControlFilterComponent, NumericBadgeComponent, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SegmentedControlStory {
	filtersValue = '0';
	filtersNumericValue = '0';
	filtersLoadingValue = '0';
	filtersSmallValue = '0';
}

export default {
	title: 'QA/SegmentedControl',
	component: SegmentedControlStory,
} as Meta;

export const Basic = {};
