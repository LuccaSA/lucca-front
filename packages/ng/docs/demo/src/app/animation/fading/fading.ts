import { Component, ChangeDetectionStrategy } from '@angular/core';

import { luFadeAnimationFactory } from '@lucca-front/ng';
// const fade = LfAnimationFactory(); // defaults to fade
@Component({
	selector: 'demo-animations-fading',
	templateUrl: './fading.html',
	styleUrls: ['../animation.scss'],
	animations: [luFadeAnimationFactory()],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FadingComponent {
	fading = false;
}
