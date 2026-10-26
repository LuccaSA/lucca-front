import { Directive, input, linkedSignal, TemplateRef } from '@angular/core';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { ILuUser } from '@lucca-front/ng/user';
import { LU_USER_POPOVER_CUSTOM_CONTENT, LU_USER_POPOVER_USER, LuUserPopoverCustomContentContext } from '../../user-popover.providers';
import { LuUserPopoverComponent } from './user-popover.component';

@Directive({
	selector: '[luUserPopover]',
	host: {
		'[attr.aria-expanded]': 'opened()',
	},
	exportAs: 'LuUserPopoverDirective',
})
export class LuUserPopoverDirective extends PopoverDirective {
	readonly luUserPopover = input.required<ILuUser>();

	readonly luUserPopoverDisabled = input<boolean>(false);

	override readonly luPopoverDisabled = linkedSignal(() => this.luUserPopoverDisabled());

	/**
	 * Template displayed at the bottom of the popover, below the user details. Its implicit context is the user.
	 */
	readonly luUserPopoverCustomContent = input<TemplateRef<LuUserPopoverCustomContentContext> | null>(null);

	override readonly additionalProviders = [
		{ provide: LU_USER_POPOVER_USER, useValue: this.luUserPopover },
		{ provide: LU_USER_POPOVER_CUSTOM_CONTENT, useValue: this.luUserPopoverCustomContent },
	];

	constructor() {
		super();
		this.customPositions.set([
			{ overlayX: 'start', overlayY: 'bottom', originX: 'start', originY: 'top' },
			{ overlayX: 'start', overlayY: 'top', originX: 'start', originY: 'bottom' },
		]);
		this.luPopoverTrigger.set('hover+focus');
		this.luPopoverNoCloseButton.set(true);
		this.content.set(LuUserPopoverComponent);
	}
}
