import { trigger, AnimationTriggerMetadata } from '@angular/animations';

import { fadingAnimations } from './fade.animation';
import { scalingAnimations } from './scale.animation';
import { slidingAnimations } from './slide.animation';

export type AnimationType = 'scale' | 'slide' | 'fade';

export function LfAnimationFactory(type: AnimationType = 'fade', duration: number = 250, delay: number = 0, easing: string = 'ease-out'): AnimationTriggerMetadata {

	const animationTiming = `${duration}ms ${delay}ms ${easing}`;

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

export function LfFadeAnimationFactory(duration: number = 250, delay: number = 0, easing: string = 'ease-out'): AnimationTriggerMetadata {
	return LfAnimationFactory('fade', duration, delay, easing);
}
export function LfSlideAnimationFactory(duration: number = 250, delay: number = 0, easing: string = 'ease-out'): AnimationTriggerMetadata {
	return LfAnimationFactory('slide', duration, delay, easing);
}
export function LfScaleAnimationFactory(duration: number = 250, delay: number = 0, easing: string = 'ease-out'): AnimationTriggerMetadata {
	return LfAnimationFactory('scale', duration, delay, easing);
}

