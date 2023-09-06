import { trigger, state, style, animate, transition, AnimationTriggerMetadata } from '@angular/animations';

export const luTransformPopover: AnimationTriggerMetadata = trigger('transformPopover', [
	state(
		'enter',
		style({
			opacity: 1,
			transform: `scale(1)`,
		}),
	),
	transition('void => *', [
		style({
			opacity: 0,
			transform: `scale(0)`,
		}),
		animate(`150ms cubic-bezier(0.25, 0.8, 0.25, 1)`),
	]),
	transition('* => void', [animate('50ms 100ms linear', style({ opacity: 0 }))]),
]);
