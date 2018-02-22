import { Component } from '@angular/core';

import { LfAnimationFactory, LfFadeAnimationFactory } from '../../../../src/app/animations';
const fade = LfFadeAnimationFactory();
// const fade = LfAnimationFactory(); // defaults to fade
@Component({
	selector: 'demo-animations-fading',
	templateUrl: './fading.component.html',
	styleUrls: ['../animations.scss'],
	// animations: [fade],
})
export class FadingComponent {
}
