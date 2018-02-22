import { Component } from '@angular/core';

import { LfSlideAnimationFactory } from '../../../../src/app/animations';
const slide = LfSlideAnimationFactory();

@Component({
	selector: 'demo-animations-sliding',
	templateUrl: './sliding.component.html',
	styleUrls: ['../animations.scss'],
	animations: [{
		useFactory: LfSlideAnimationFactory,
	}],
})
export class SlidingComponent {}
