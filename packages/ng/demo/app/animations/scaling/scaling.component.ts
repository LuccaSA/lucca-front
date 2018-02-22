import { Component } from '@angular/core';
import { AnimationTriggerMetadata } from '@angular/animations';

import { LfScaleAnimationFactory } from '../../../../src/app/animations';
const scale = LfScaleAnimationFactory() as AnimationTriggerMetadata;
@Component({
	selector: 'demo-animations-scaling',
	templateUrl: './scaling.component.html',
	styleUrls: ['../animations.scss'],
	animations: [scale],
})
export class ScalingComponent {
}
