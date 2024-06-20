import { booleanAttribute, ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'lu-skeleton-header',
	standalone: true,
	templateUrl: './skeleton-header.component.html',
	styleUrl: './skeleton-header.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonHeaderComponent {
	@Input({ transform: booleanAttribute })
	dark = false;
}
