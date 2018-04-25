import { Component, ChangeDetectionStrategy } from '@angular/core';

import { LuSlideAnimationFactory } from '../../../../src/app/animations';

@Component({
	selector: 'demo-animations-sliding',
	templateUrl: './sliding.component.html',
	styleUrls: ['../animations.scss'],
	animations: [LuSlideAnimationFactory()],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlidingComponent {
	slidingLeft = false;
	slidingRight = false;
	slidingTop = false;
	slidingBottom = false;
}
