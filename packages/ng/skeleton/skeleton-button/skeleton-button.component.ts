import { booleanAttribute, ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'lu-skeleton-button',
	standalone: true,
	templateUrl: './skeleton-button.component.html',
	styleUrl: './skeleton-button.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonButtonComponent {
	@Input({ transform: booleanAttribute })
	dark = false;
}
