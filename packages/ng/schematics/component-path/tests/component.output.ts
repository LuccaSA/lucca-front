import { Component } from '@angular/core';
import { ScrollBoxComponent } from '@lucca-front/ng/scroll-box';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
import { SegmentedControlTabsComponent, SegmentedControlTabsPanelComponent } from '@lucca-front/ng/segmented-control-tabs';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';

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
