import { Component } from '@angular/core';

import { LFAnimationFactory } from '../../../../src/app/animations';

@Component({
	selector: 'demo-animations-scaling',
	templateUrl: './scaling.component.html',
	styleUrls: ['../animations.scss'],
	animations: [LFAnimationFactory('scale')],
})
export class ScalingComponent {
}
