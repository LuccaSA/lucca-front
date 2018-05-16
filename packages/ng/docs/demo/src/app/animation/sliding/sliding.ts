import { Component, ChangeDetectionStrategy } from '@angular/core';

import { luSlideAnimationFactory } from '@core';

@Component({
	selector: 'demo-animations-sliding',
	templateUrl: './sliding.html',
	styleUrls: ['../animation.scss'],
	animations: [luSlideAnimationFactory()],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlidingComponent {
	slidingLeft = false;
	slidingRight = false;
	slidingTop = false;
	slidingBottom = false;
}
