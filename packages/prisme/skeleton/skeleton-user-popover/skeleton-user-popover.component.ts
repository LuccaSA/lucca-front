import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ɵinjectRandomPercent } from '@lucca/prisme/core';

@Component({
	selector: 'lu-skeleton-user-popover',
	templateUrl: './skeleton-user-popover.component.html',
	styleUrl: './skeleton-user-popover.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonUserPopoverComponent {
	readonly getRandomPercent = ɵinjectRandomPercent(50, 100);
}
