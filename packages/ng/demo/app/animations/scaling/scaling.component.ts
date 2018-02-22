import { Component } from '@angular/core';
import { LfScaleAnimationFactory } from '../../../../src/app/animations';
@Component({
	selector: 'demo-animations-scaling',
	templateUrl: './scaling.component.html',
	styleUrls: ['../animations.scss'],
	animations: [{
		useFactory: LfScaleAnimationFactory,
	}],
})
export class ScalingComponent {
}
