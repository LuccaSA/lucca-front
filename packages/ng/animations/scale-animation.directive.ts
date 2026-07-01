import { computed, Directive, input } from '@angular/core';

export type LuScaleAnimationDirection = 'center' | 'left' | 'right' | 'top' | 'bottom';

const ENTER_CLASSES: Record<LuScaleAnimationDirection, string> = {
	center: 'pr-u-animatedScaleIn',
	left: 'pr-u-animatedScaleInLeft',
	right: 'pr-u-animatedScaleInRight',
	top: 'pr-u-animatedScaleInTop',
	bottom: 'pr-u-animatedScaleInBottom',
};

const LEAVE_CLASSES: Record<LuScaleAnimationDirection, string> = {
	center: 'pr-u-animatedScaleOut',
	left: 'pr-u-animatedScaleOutLeft',
	right: 'pr-u-animatedScaleOutRight',
	top: 'pr-u-animatedScaleOutTop',
	bottom: 'pr-u-animatedScaleOutBottom',
};

/**
 * Scales an element in when it enters the DOM and out when it leaves, using the native
 * `animate.enter` / `animate.leave` API and the `pr-u-animated*` CSS classes. Drop-in
 * replacement for `luScaleAnimationFactory`.
 */
@Directive({
	selector: '[luScaleAnimation]',
	host: {
		'[animate.enter]': 'enterClass()',
		'[animate.leave]': 'leaveClass()',
	},
})
export class LuScaleAnimation {
	/** Direction the element scales from when entering (and towards when leaving). */
	readonly direction = input<LuScaleAnimationDirection>('center', { alias: 'luScaleAnimation' });

	protected readonly enterClass = computed(() => ENTER_CLASSES[this.direction()]);
	protected readonly leaveClass = computed(() => LEAVE_CLASSES[this.direction()]);
}
