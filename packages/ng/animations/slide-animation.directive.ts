import { computed, Directive, input } from '@angular/core';

export type LuSlideAnimationDirection = 'left' | 'right' | 'top' | 'bottom';

const ENTER_CLASSES: Record<LuSlideAnimationDirection, string> = {
	left: 'pr-u-animatedSlideInLeft',
	right: 'pr-u-animatedSlideInRight',
	top: 'pr-u-animatedSlideIn',
	bottom: 'pr-u-animatedSlideInBottom',
};

const LEAVE_CLASSES: Record<LuSlideAnimationDirection, string> = {
	left: 'pr-u-animatedSlideOutLeft',
	right: 'pr-u-animatedSlideOutRight',
	top: 'pr-u-animatedSlideOut',
	bottom: 'pr-u-animatedSlideOutBottom',
};

/**
 * Slides an element in when it enters the DOM and out when it leaves, using the native
 * `animate.enter` / `animate.leave` API and the `pr-u-animated*` CSS classes. Drop-in
 * replacement for `luSlideAnimationFactory`.
 */
@Directive({
	selector: '[luSlideAnimation]',
	host: {
		'[animate.enter]': 'enterClass()',
		'[animate.leave]': 'leaveClass()',
	},
})
export class LuSlideAnimation {
	/** Direction the element slides from when entering (and towards when leaving). */
	readonly direction = input<LuSlideAnimationDirection>('left', { alias: 'luSlideAnimation' });

	protected readonly enterClass = computed(() => ENTER_CLASSES[this.direction()]);
	protected readonly leaveClass = computed(() => LEAVE_CLASSES[this.direction()]);
}
