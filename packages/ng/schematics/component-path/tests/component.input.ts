import { Component } from '@angular/core';
import { ScrollBoxComponent } from '@lucca-front/ng/scrollBox';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmentedControl';
import { SegmentedControlTabsComponent, SegmentedControlTabsPanelComponent } from '@lucca-front/ng/segmentedControlTabs';
import { StatusBadgeComponent } from '@lucca-front/ng/statusBadge';

@Component({
	selector: 'lu-test',
	standalone: true,
	template: `
		<span class="u-mask"></span>
	`,
	imports: [
		ScrollBoxComponent,
		SegmentedControlComponent,
		SegmentedControlFilterComponent,
		SegmentedControlTabsPanelComponent,
		SegmentedControlTabsComponent,
		StatusBadgeComponent,
	]
})
export class SimpleCasesComponent {
}
