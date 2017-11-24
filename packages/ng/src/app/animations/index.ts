import { trigger, AnimationTriggerMetadata } from '@angular/animations';

import { fadingAnimations } from './basicAnimations';
import { scalingAnimations } from './scalingAnimations';
import { slidingAnimations } from './slidingAnimations';

export const LFAnimationFactory =
	(type: AnimationType = 'fade', duration: number = 250, delay: number = 0, easing: string = 'ease-out'): AnimationTriggerMetadata => {

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
};

export type AnimationType = 'scale' | 'slide' | 'fade';
