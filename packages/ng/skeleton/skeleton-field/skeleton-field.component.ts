import { booleanAttribute, ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'lu-skeleton-field',
	standalone: true,
	templateUrl: './skeleton-field.component.html',
	styleUrl: './skeleton-field.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonFieldComponent {
	@Input({ transform: booleanAttribute })
	dark = false;
}
