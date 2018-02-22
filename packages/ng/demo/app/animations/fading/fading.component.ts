import { Component } from '@angular/core';

import { LfFadeAnimationFactory } from '../../../../src/app/animations';
// const fade = LfAnimationFactory(); // defaults to fade
@Component({
	selector: 'demo-animations-fading',
	templateUrl: './fading.component.html',
	styleUrls: ['../animations.scss'],
	animations: [{
		useFactory: LfFadeAnimationFactory,
	}],
})
export class FadingComponent {
	fading = false;
}
