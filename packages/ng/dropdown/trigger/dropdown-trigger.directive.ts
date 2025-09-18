import { Directive, inject, Input, TemplateRef, Type } from '@angular/core';
import { ALuPopoverPanel, LuPopoverAlignment } from '@lucca-front/ng/popover';
import { PopoverDirective } from '@lucca-front/ng/popover2';

@Directive({
	selector: '[luDropdown]',
	exportAs: 'LuDropdownTrigger',
	host: {
		'[attr.aria-expanded]': 'popover2.opened()',
	},
	hostDirectives: [
		{
			directive: PopoverDirective,
			inputs: ['luPopoverPosition: luDropdownPosition', 'luPopoverDisabled: luDropdownDisabled', 'customPositions', 'luPopoverNoCloseButton: luDropdownNoCloseButton'],
			outputs: ['luPopoverOpened: luDropdownOnOpen', 'luPopoverClosed: luDropdownOnClose'],
		},
	],
	standalone: true,
})
export class LuDropdownTriggerDirective<_T> {
	protected popover2 = inject(PopoverDirective);
	// Keeping generic type here just for the sake of backwards compatibility
	/** References the popover instance that the trigger is associated with. */
	@Input('luDropdown') set inputPanel(p: TemplateRef<unknown> | Type<unknown> | ALuPopoverPanel) {
		if (p instanceof ALuPopoverPanel) {
			this.popover2.content = p.templateRef;
		} else {
			this.popover2.content = p;
		}
	}

	constructor() {
		// We're using constructor here to setup default values before inputs are processed
		// This way, the value will be changed if any input changes it but we can still have separate default values
		this.popover2.luPopoverPosition = 'below';
	}

	/** how the panel will be aligned with the target, allowed values: top, bottom, left, right
	 * @deprecated prefer using customPositions instead
	 * */
	luDropdownAlignment: LuPopoverAlignment;
	// TODO dropdown positions
}
