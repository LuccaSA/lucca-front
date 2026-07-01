import { animate, AnimationMetadata, style, transition } from '@angular/animations';

/**
 * @deprecated Relies on `@angular/animations`, which is no longer a hard dependency of Lucca Front.
 * Use the {@link LuFadeAnimation} directive instead, which is based on the native `animate.enter` /
 * `animate.leave` API. This function will be removed in v23 (December 2026 / January 2027).
 */
export function luFadingAnimation(inTiming: string, outTiming: string): AnimationMetadata[] {
	return [
		transition('void => *', [style({ opacity: '0' }), animate(inTiming, style({ opacity: '1' }))]),
		transition('* => void', [style({ opacity: '1' }), animate(outTiming, style({ opacity: '0' }))]),
	];
}
