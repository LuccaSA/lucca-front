import { Component } from '@angular/core';

import { LFAnimationFactory } from '../../../../src/app/animations';

@Component({
	selector: 'demo-animations-basic',
	templateUrl: './basic.component.html',
	styleUrls: ['../animations.scss'],
	animations: [LFAnimationFactory('fade')],
})
export class BasicComponent {
}
