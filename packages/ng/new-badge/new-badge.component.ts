import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-new-badge',
	templateUrl: './new-badge.component.html',
	styleUrl: './new-badge.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'newBadge',
	},
})
export class NewBadgeComponent {
	/**
	 * Changes the text displayed by the newBadge
	 */
	readonly label = input.required<string>();
}
