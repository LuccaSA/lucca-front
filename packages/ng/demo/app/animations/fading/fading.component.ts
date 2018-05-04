import { Component, ChangeDetectionStrategy } from '@angular/core';

import { LuFadeAnimationFactory } from '../../../../src/app/animations';
// const fade = LfAnimationFactory(); // defaults to fade
@Component({
	selector: 'demo-animations-fading',
	templateUrl: './fading.component.html',
	styleUrls: ['../animations.scss'],
	animations: [LuFadeAnimationFactory()],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FadingComponent {
	fading = false;
}
