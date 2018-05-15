import { trigger, AnimationTriggerMetadata } from '@angular/animations';

import { luFadingAnimation } from './fade.animation';
import { luScalingAnimation } from './scale.animation';
import { luSlidingAnimation } from './slide.animation';

export type LuAnimationType = 'scale' | 'slide' | 'fade';
export const DEFAULT_LF_ANIMATION_TIMING = '250ms 0ms ease-out';

export function LuFadeAnimationFactory(
	animationInTiming: string = DEFAULT_LF_ANIMATION_TIMING,
	animationOutTiming: string = DEFAULT_LF_ANIMATION_TIMING,
	triggerName: string = 'fadeAnimation',
): AnimationTriggerMetadata {
	return trigger(triggerName, [
		...luFadingAnimation(animationInTiming, animationOutTiming),
	]);
}
export function LuScaleAnimationFactory(
	animationInTiming: string = DEFAULT_LF_ANIMATION_TIMING,
	animationOutTiming: string = DEFAULT_LF_ANIMATION_TIMING,
	triggerName: string = 'scaleAnimation',
): AnimationTriggerMetadata {
	return trigger(triggerName, [
		...luScalingAnimation(animationInTiming, animationOutTiming),
	]);
}
export function LuSlideAnimationFactory(
	animationInTiming: string = DEFAULT_LF_ANIMATION_TIMING,
	animationOutTiming: string = DEFAULT_LF_ANIMATION_TIMING,
	triggerName: string = 'slideAnimation',
): AnimationTriggerMetadata {
	return trigger(triggerName, [
		...luSlidingAnimation(animationInTiming, animationOutTiming),
	]);
}
