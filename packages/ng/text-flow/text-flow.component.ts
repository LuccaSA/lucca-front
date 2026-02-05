import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-text-flow',
	template: `<ng-content />`,
	styleUrl: './text-flow.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'textFlow',
	},
})
export class TextFlowComponent {}
