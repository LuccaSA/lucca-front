import {
	state,
	style,
	animate,
	transition,
	AnimationMetadata,
} from '@angular/animations';

export const scalingAnimations = (timing: string): AnimationMetadata[] => [
	transition('void => left', [ // ---> entering --->
		style({ transformOrigin: 'left center', transform: 'scaleX(0)', opacity: '0' }),
		animate(
			timing,
			style({ transformOrigin: 'left center', transform: 'scaleX(1)', opacity: '1' })
		)
	]),
	transition('left => void', [ // <--- leaving <---
		style({ transformOrigin: 'left center', transform: 'scaleX(1)', opacity: '1' }),
		animate(
			timing,
			style({ transformOrigin: 'left center', transform: 'scaleX(0)', opacity: '0' })
		)
	]),

	transition('void => right', [ // <--- entering <---
		style({ transformOrigin: 'right center', transform: 'scaleX(0)', opacity: '0' }),
		animate(
			timing,
			style({ transformOrigin: 'right center', transform: 'scaleX(1)', opacity: '1' })
		)
	]),
	transition('right => void', [ // ---> leaving --->
		style({ transformOrigin: 'right center', transform: 'scaleX(1)', opacity: '1' }),
		animate(
			timing,
			style({ transformOrigin: 'right center', transform: 'scaleX(0)', opacity: '0' })
		)
	]),

	transition('void => top', [ // \/ entering
		style({ transformOrigin: 'center top', transform: 'scaleY(0)', opacity: '0' }),
		animate(
			timing,
			style({ transformOrigin: 'center top', transform: 'scaleY(1)', opacity: '1' })
		)
	]),
	transition('top => void', [ // /\ leaving
		style({ transformOrigin: 'center top', transform: 'scaleY(1)', opacity: '1' }),
		animate(
			timing,
			style({ transformOrigin: 'center top', transform: 'scaleY(0)', opacity: '0' })
		)
	]),

	transition('void => bottom', [ // /\ entering
		style({ transformOrigin: 'center bottom', transform: 'scaleY(0)', opacity: '0' }),
		animate(
			timing,
			style({ transformOrigin: 'center bottom', transform: 'scaleY(1)', opacity: '1' })
		)
	]),
	transition('bottom => void', [ // \/ leaving
		style({ transformOrigin: 'center bottom', transform: 'scaleY(1)', opacity: '1' }),
		animate(
			timing,
			style({ transformOrigin: 'center bottom', transform: 'scaleY(0)', opacity: '0' })
		)
	]),

	transition('void => center, void => *', [
		style({ transformOrigin: 'center', transform: 'scale(0)', opacity: '0' }),
		animate(
			timing,
			style({ transformOrigin: 'center', transform: 'scale(1)', opacity: '1' })
		)
	]),
	transition('center => void , * => void', [
		style({ transformOrigin: 'center', transform: 'scale(1)', opacity: '1' }),
		animate(
			timing,
			style({ transformOrigin: 'center', transform: 'scale(0)', opacity: '0' })
		)
	]),
];
