import {
	state,
	style,
	animate,
	transition,
	AnimationMetadata,
} from '@angular/animations';

export const fadingAnimations = (timing: string): AnimationMetadata[] => [
	transition('void => *', [
		style({ opacity: '0' }),
		animate(
			'.25s ease-out',
			style({ opacity: '1' })
		)
	]),
	transition('* => void', [
		style({ opacity: '1' }),
		animate(
			'.25s ease-out',
			style({ opacity: '0' })
		)
	])
];
