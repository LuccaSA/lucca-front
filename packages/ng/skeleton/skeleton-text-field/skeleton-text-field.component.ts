import { booleanAttribute, ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'lu-skeleton-text-field',
	standalone: true,
	templateUrl: './skeleton-text-field.component.html',
	styleUrl: './skeleton-text-field.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonTextFieldComponent {
	@Input({ transform: booleanAttribute })
	dark = false;
}
