import { trigger, AnimationTriggerMetadata } from '@angular/animations';

import { luFadingAnimation } from './fade.animation';
import { luScalingAnimation } from './scale.animation';
import { luSlidingAnimation } from './slide.animation';

export type LuAnimationType = 'scale' | 'slide' | 'fade';
export const LU_DEFAULT_ANIMATION_TIMING = '250ms 0ms ease-out';

export function luFadeAnimationFactory(
	animationInTiming: string = LU_DEFAULT_ANIMATION_TIMING,
	animationOutTiming: string = LU_DEFAULT_ANIMATION_TIMING,
	triggerName = 'fadeAnimation',
): AnimationTriggerMetadata {
	return trigger(triggerName, [
		...luFadingAnimation(animationInTiming, animationOutTiming),
	]);
}
export function luScaleAnimationFactory(
	animationInTiming: string = LU_DEFAULT_ANIMATION_TIMING,
	animationOutTiming: string = LU_DEFAULT_ANIMATION_TIMING,
	triggerName = 'scaleAnimation',
): AnimationTriggerMetadata {
	return trigger(triggerName, [
		...luScalingAnimation(animationInTiming, animationOutTiming),
	]);
}
export function luSlideAnimationFactory(
	animationInTiming: string = LU_DEFAULT_ANIMATION_TIMING,
	animationOutTiming: string = LU_DEFAULT_ANIMATION_TIMING,
	triggerName = 'slideAnimation',
): AnimationTriggerMetadata {
	return trigger(triggerName, [
		...luSlidingAnimation(animationInTiming, animationOutTiming),
	]);
}
