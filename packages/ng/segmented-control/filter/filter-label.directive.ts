import { Directive } from '@angular/core';

/**
 * Projects the element it is set on as the label of the parent `lu-segmented-control-filter`.
 * Alternative to the `label` input, which takes precedence when both are provided.
 */
@Directive({
	selector: '[luSegmentedControlFilterLabel]',
})
export class SegmentedControlFilterLabelDirective {}
