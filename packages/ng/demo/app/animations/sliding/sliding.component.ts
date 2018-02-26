import { Component } from '@angular/core';

import { LfSlideAnimationFactory } from '../../../../src/app/animations';

@Component({
	selector: 'demo-animations-sliding',
	templateUrl: './sliding.component.html',
	styleUrls: ['../animations.scss'],
	animations: [LfSlideAnimationFactory()],
})
export class SlidingComponent {
	slidingLeft = false;
	slidingRight = false;
	slidingTop = false;
	slidingBottom = false;
}
