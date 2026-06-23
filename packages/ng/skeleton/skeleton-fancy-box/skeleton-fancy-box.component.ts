import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: '<lu-skeleton-fancy-box',
	templateUrl: './skeleton-fancy-box.component.html',
	styleUrl: './skeleton-fancy-box.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonFancyBoxComponent {
	readonly getRandomPercent = (min: number = 80, max: number = 100): string => `${Math.floor(Math.random() * (max - min) + min).toString()}%`;
}
