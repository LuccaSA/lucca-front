import {
	state,
	style,
	animate,
	transition,
	AnimationMetadata,
} from '@angular/animations';

export function luFadingAnimation(
	inTiming: string,
	outTiming: string,
): AnimationMetadata[] {
	return [
		transition('void => *', [
			style({ opacity: '0' }),
			animate(inTiming, style({ opacity: '1' })),
		]),
		transition('* => void', [
			style({ opacity: '1' }),
			animate(outTiming, style({ opacity: '0' })),
		]),
	];
}
