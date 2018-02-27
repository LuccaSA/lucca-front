import { trigger, AnimationTriggerMetadata } from '@angular/animations';

import { fadingAnimations } from './fade.animation';
import { scalingAnimations } from './scale.animation';
import { slidingAnimations } from './slide.animation';

export type AnimationType = 'scale' | 'slide' | 'fade';
export const DEFAULT_LF_ANIMATION_TIMING = '250ms 0ms ease-out';

export function LuAnimationFactory(type: AnimationType = 'fade', animationTiming: string = DEFAULT_LF_ANIMATION_TIMING): AnimationTriggerMetadata {
	switch (type) {
		case 'fade':
			return trigger('fadeAnimation', [...fadingAnimations(animationTiming)]);
		case 'scale':
			return trigger('scaleAnimation', [...scalingAnimations(animationTiming)]);
		case 'slide':
			return trigger('slideAnimation', [...slidingAnimations(animationTiming)]);
		default:
			throw Error(`${type} is not a valid AnimationType`);
	}
}

export function LuFadeAnimationFactory(animationTiming: string = DEFAULT_LF_ANIMATION_TIMING): AnimationTriggerMetadata {
	return trigger('fadeAnimation', [...fadingAnimations(animationTiming)]);
}
export function LuScaleAnimationFactory(animationTiming: string = DEFAULT_LF_ANIMATION_TIMING): AnimationTriggerMetadata {
	return trigger('scaleAnimation', [...scalingAnimations(animationTiming)]);
}
export function LuSlideAnimationFactory(animationTiming: string = DEFAULT_LF_ANIMATION_TIMING): AnimationTriggerMetadata {
	return trigger('slideAnimation', [...slidingAnimations(animationTiming)]);
}

