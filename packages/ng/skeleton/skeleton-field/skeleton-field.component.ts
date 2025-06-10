import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
	selector: 'lu-skeleton-field',
	standalone: true,
	templateUrl: './skeleton-field.component.html',
	styleUrl: './skeleton-field.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonFieldComponent {
	readonly dark = input(false, { transform: booleanAttribute });

	readonly hiddenLabel = input(false, { transform: booleanAttribute });
}
