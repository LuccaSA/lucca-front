import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
	selector: 'lu-skeleton-button',
	templateUrl: './skeleton-button.component.html',
	styleUrl: './skeleton-button.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonButtonComponent {
	readonly dark = input(false, { transform: booleanAttribute });

	readonly size = input<'XS' | 'S' | 'M'>();
}
