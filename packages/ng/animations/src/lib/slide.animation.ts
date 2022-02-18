import { animate, AnimationMetadata, style, transition } from '@angular/animations';

export function luSlidingAnimation(inTiming: string, outTiming: string): AnimationMetadata[] {
	return [
		transition('void => right', [
			// <--- entering <---
			style({
				transformOrigin: 'right center',
				transform: 'translateX(50px)',
				opacity: '0',
			}),
			animate(
				inTiming,
				style({
					transformOrigin: 'right center',
					transform: 'translateX(0)',
					opacity: '1',
				}),
			),
		]),
		transition('right => void', [
			// ---> leaving --->
			style({
				transformOrigin: 'right center',
				transform: 'translateX(0)',
				opacity: '1',
			}),
			animate(
				outTiming,
				style({
					transformOrigin: 'right center',
					transform: 'translateX(50px)',
					opacity: '0',
				}),
			),
		]),

		transition('void => top', [
			// \/ entering
			style({
				transformOrigin: 'center',
				transform: 'translateY(-20px)',
				opacity: '0',
			}),
			animate(
				inTiming,
				style({
					transformOrigin: 'center',
					transform: 'translateY(0)',
					opacity: '1',
				}),
			),
		]),
		transition('top => void', [
			// /\ leaving
			style({
				transformOrigin: 'center',
				transform: 'translateY(0)',
				opacity: '1',
			}),
			animate(
				outTiming,
				style({
					transformOrigin: 'center',
					transform: 'translateY(-20px)',
					opacity: '0',
				}),
			),
		]),

		transition('void => bottom', [
			// /\ entering
			style({
				transformOrigin: 'center',
				transform: 'translateY(20px)',
				opacity: '0',
			}),
			animate(
				inTiming,
				style({
					transformOrigin: 'center',
					transform: 'translateY(0)',
					opacity: '1',
				}),
			),
		]),
		transition('bottom => void', [
			// \/ leaving
			style({
				transformOrigin: 'center',
				transform: 'translateY(0)',
				opacity: '1',
			}),
			animate(
				outTiming,
				style({
					transformOrigin: 'center',
					transform: 'translateY(20px)',
					opacity: '0',
				}),
			),
		]),

		transition('void => left, void => *', [
			// ---> entering --->
			style({
				transformOrigin: 'left center',
				transform: 'translateX(-50px)',
				opacity: '0',
			}),
			animate(
				inTiming,
				style({
					transformOrigin: 'left center',
					transform: 'translateX(0)',
					opacity: '1',
				}),
			),
		]),
		transition('left => void, * => void', [
			// <--- leaving <---
			style({
				transformOrigin: 'left center',
				transform: 'translateX(0)',
				opacity: '1',
			}),
			animate(
				outTiming,
				style({
					transformOrigin: 'left center',
					transform: 'translateX(-50px)',
					opacity: '0',
				}),
			),
		]),
	];
}
