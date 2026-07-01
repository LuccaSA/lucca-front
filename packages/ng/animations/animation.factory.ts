import { AnimationTriggerMetadata, trigger } from '@angular/animations';
import { luFadingAnimation } from './fade.animation';
import { luScalingAnimation } from './scale.animation';
import { luSlidingAnimation } from './slide.animation';

export type LuAnimationType = 'scale' | 'slide' | 'fade';
export const LU_DEFAULT_ANIMATION_TIMING = '250ms 0ms ease-out';

/**
 * @deprecated Relies on `@angular/animations`, which is no longer a hard dependency of Lucca Front.
 * Use the {@link LuFadeAnimation} directive instead, which is based on the native `animate.enter` /
 * `animate.leave` API. This function will be removed in v23 (December 2026 / January 2027).
 */
export function luFadeAnimationFactory(
	animationInTiming: string = LU_DEFAULT_ANIMATION_TIMING,
	animationOutTiming: string = LU_DEFAULT_ANIMATION_TIMING,
	triggerName = 'fadeAnimation',
): AnimationTriggerMetadata {
	return trigger(triggerName, [...luFadingAnimation(animationInTiming, animationOutTiming)]);
}
/**
 * @deprecated Relies on `@angular/animations`, which is no longer a hard dependency of Lucca Front.
 * Use the {@link LuScaleAnimation} directive instead, which is based on the native `animate.enter` /
 * `animate.leave` API. This function will be removed in v23 (December 2026 / January 2027).
 */
export function luScaleAnimationFactory(
	animationInTiming: string = LU_DEFAULT_ANIMATION_TIMING,
	animationOutTiming: string = LU_DEFAULT_ANIMATION_TIMING,
	triggerName = 'scaleAnimation',
): AnimationTriggerMetadata {
	return trigger(triggerName, [...luScalingAnimation(animationInTiming, animationOutTiming)]);
}
/**
 * @deprecated Relies on `@angular/animations`, which is no longer a hard dependency of Lucca Front.
 * Use the {@link LuSlideAnimation} directive instead, which is based on the native `animate.enter` /
 * `animate.leave` API. This function will be removed in v23 (December 2026 / January 2027).
 */
export function luSlideAnimationFactory(
	animationInTiming: string = LU_DEFAULT_ANIMATION_TIMING,
	animationOutTiming: string = LU_DEFAULT_ANIMATION_TIMING,
	triggerName = 'slideAnimation',
): AnimationTriggerMetadata {
	return trigger(triggerName, [...luSlidingAnimation(animationInTiming, animationOutTiming)]);
}
