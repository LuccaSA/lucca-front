import {
	animate,
	AnimationMetadata,
	style,
	transition,
} from '@angular/animations';

export function luScalingAnimation(
	inTiming: string,
	outTiming: string,
): AnimationMetadata[] {
	return [
		transition('void => left', [
			// ---> entering --->
			style({
				transformOrigin: 'left center',
				transform: 'scaleX(0)',
				opacity: '0',
			}),
			animate(
				inTiming,
				style({
					transformOrigin: 'left center',
					transform: 'scaleX(1)',
					opacity: '1',
				}),
			),
		]),
		transition('left => void', [
			// <--- leaving <---
			style({
				transformOrigin: 'left center',
				transform: 'scaleX(1)',
				opacity: '1',
			}),
			animate(
				outTiming,
				style({
					transformOrigin: 'left center',
					transform: 'scaleX(0)',
					opacity: '0',
				}),
			),
		]),

		transition('void => right', [
			// <--- entering <---
			style({
				transformOrigin: 'right center',
				transform: 'scaleX(0)',
				opacity: '0',
			}),
			animate(
				inTiming,
				style({
					transformOrigin: 'right center',
					transform: 'scaleX(1)',
					opacity: '1',
				}),
			),
		]),
		transition('right => void', [
			// ---> leaving --->
			style({
				transformOrigin: 'right center',
				transform: 'scaleX(1)',
				opacity: '1',
			}),
			animate(
				outTiming,
				style({
					transformOrigin: 'right center',
					transform: 'scaleX(0)',
					opacity: '0',
				}),
			),
		]),

		transition('void => top', [
			// \/ entering
			style({
				transformOrigin: 'center top',
				transform: 'scaleY(0)',
				opacity: '0',
			}),
			animate(
				inTiming,
				style({
					transformOrigin: 'center top',
					transform: 'scaleY(1)',
					opacity: '1',
				}),
			),
		]),
		transition('top => void', [
			// /\ leaving
			style({
				transformOrigin: 'center top',
				transform: 'scaleY(1)',
				opacity: '1',
			}),
			animate(
				outTiming,
				style({
					transformOrigin: 'center top',
					transform: 'scaleY(0)',
					opacity: '0',
				}),
			),
		]),

		transition('void => bottom', [
			// /\ entering
			style({
				transformOrigin: 'center bottom',
				transform: 'scaleY(0)',
				opacity: '0',
			}),
			animate(
				inTiming,
				style({
					transformOrigin: 'center bottom',
					transform: 'scaleY(1)',
					opacity: '1',
				}),
			),
		]),
		transition('bottom => void', [
			// \/ leaving
			style({
				transformOrigin: 'center bottom',
				transform: 'scaleY(1)',
				opacity: '1',
			}),
			animate(
				outTiming,
				style({
					transformOrigin: 'center bottom',
					transform: 'scaleY(0)',
					opacity: '0',
				}),
			),
		]),

		transition('void => center, void => *', [
			style({ transformOrigin: 'center', transform: 'scale(0)', opacity: '0' }),
			animate(
				inTiming,
				style({
					transformOrigin: 'center',
					transform: 'scale(1)',
					opacity: '1',
				}),
			),
		]),
		transition('center => void , * => void', [
			style({ transformOrigin: 'center', transform: 'scale(1)', opacity: '1' }),
			animate(
				outTiming,
				style({
					transformOrigin: 'center',
					transform: 'scale(0)',
					opacity: '0',
				}),
			),
		]),
	];
}
