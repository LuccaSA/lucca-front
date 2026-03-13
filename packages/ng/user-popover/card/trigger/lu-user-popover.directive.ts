import { Directive, Input, input } from '@angular/core';
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
	luUserPopover = input.required<ILuUser>();

	@Input()
	set luUserPopoverDisabled(disabled: boolean) {
		this.luPopoverDisabled = disabled;
	}

	override additionalProviders = [{ provide: LU_USER_POPOVER_USER, useValue: this.luUserPopover }];

	constructor() {
		super();
		this.luPopoverDisabled = false;
		this.customPositions = [
			{ overlayX: 'start', overlayY: 'bottom', originX: 'start', originY: 'top' },
			{ overlayX: 'start', overlayY: 'top', originX: 'start', originY: 'bottom' },
		];

		this.luPopoverTrigger.set('hover+focus');
		this.luPopoverNoCloseButton = true;
		this.content = LuUserPopoverComponent;
	}
}
