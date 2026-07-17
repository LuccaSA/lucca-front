import { Directive, input, linkedSignal } from '@angular/core';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { ILuUser } from '@lucca-front/ng/user';
import { LU_USER_POPOVER_USER } from '../../user-popover.providers';
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

	override readonly additionalProviders = [{ provide: LU_USER_POPOVER_USER, useValue: this.luUserPopover }];

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
