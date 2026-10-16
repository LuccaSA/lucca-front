import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ɵinjectRandomPercent } from '@lucca/prisme/core';

@Component({
	selector: 'lu-skeleton-fancy-box',
	templateUrl: './skeleton-fancy-box.component.html',
	styleUrl: './skeleton-fancy-box.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonFancyBoxComponent {
	readonly getRandomPercent = ɵinjectRandomPercent(80, 100);
}
