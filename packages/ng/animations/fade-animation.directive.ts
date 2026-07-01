import { Directive } from '@angular/core';

/**
 * Fades an element in when it enters the DOM and out when it leaves, using the native
 * `animate.enter` / `animate.leave` API and the `pr-u-animated*` CSS classes. Drop-in
 * replacement for `luFadeAnimationFactory`.
 */
@Directive({
	selector: '[luFadeAnimation]',
	host: {
		'animate.enter': 'pr-u-animatedFadeIn',
		'animate.leave': 'pr-u-animatedFadeOut',
	},
})
export class LuFadeAnimation {}
