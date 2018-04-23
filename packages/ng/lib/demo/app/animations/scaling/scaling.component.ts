import { Component } from '@angular/core';
import { LuScaleAnimationFactory } from '../../../../src/app/animations';
@Component({
	selector: 'demo-animations-scaling',
	templateUrl: './scaling.component.html',
	styleUrls: ['../animations.scss'],
	animations: [LuScaleAnimationFactory()],
})
export class ScalingComponent {
	scalingLeft = false;
	scalingRight = false;
	scalingTop = false;
	scalingBottom = false;
	scalingCenter = false;
}
