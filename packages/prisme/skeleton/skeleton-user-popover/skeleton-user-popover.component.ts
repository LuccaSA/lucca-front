import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'lu-skeleton-user-popover',
	templateUrl: './skeleton-user-popover.component.html',
	styleUrl: './skeleton-user-popover.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonUserPopoverComponent {
	readonly getRandomPercent = (min: number = 50, max: number = 100): string => `${Math.floor(Math.random() * (max - min) + min).toString()}%`;
}
