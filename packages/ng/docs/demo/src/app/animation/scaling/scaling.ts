import { Component, ChangeDetectionStrategy } from '@angular/core';
import { luScaleAnimationFactory } from '@lucca-front/ng';
@Component({
	selector: 'demo-animations-scaling',
	templateUrl: './scaling.html',
	styleUrls: ['../animation.scss'],
	animations: [luScaleAnimationFactory()],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScalingComponent {
	scalingLeft = false;
	scalingRight = false;
	scalingTop = false;
	scalingBottom = false;
	scalingCenter = false;
}
