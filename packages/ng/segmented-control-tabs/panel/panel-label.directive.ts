import { Directive } from '@angular/core';

/**
 * Projects the element it is set on as the tab label of the parent `lu-segmented-control-tabs-panel`.
 * Alternative to the `label` input, which takes precedence when both are provided. `hiddenLabel` requires the text input.
 */
@Directive({
	selector: '[luSegmentedControlTabsPanelLabel]',
})
export class SegmentedControlTabsPanelLabelDirective {}
