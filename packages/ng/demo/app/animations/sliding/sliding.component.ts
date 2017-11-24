import { Component } from '@angular/core';

import { LFAnimationFactory } from '../../../../src/app/animations';

@Component({
	selector: 'demo-animations-sliding',
	templateUrl: './sliding.component.html',
	styleUrls: ['../animations.scss'],
	animations: [LFAnimationFactory('slide')],
})
export class SlidingComponent {
}
