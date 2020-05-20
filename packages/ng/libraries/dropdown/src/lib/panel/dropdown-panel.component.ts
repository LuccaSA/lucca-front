import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	Output,
	TemplateRef,
	ViewChild,
	ChangeDetectionStrategy,
} from '@angular/core';

import {
	ILuPopoverPanel,
	ALuPopoverPanel,
	luTransformPopover,
} from '@lucca-front/ng/popover';

@Component({
	selector: 'lu-dropdown',
	templateUrl: './dropdown-panel.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [luTransformPopover],
	exportAs: 'LuDropdownPanel',
})
export class LuDropdownPanelComponent extends ALuPopoverPanel implements ILuPopoverPanel, OnDestroy {
	// protected _template: TemplateRef<any>;
	// protected _templateContext: any;

	// /** Template to Use for the popover */
	// get template(): TemplateRef<any> {
	// 	return this._template;
	// }

	/**
	 * This method takes classes set on the host lu-popover element and applies them on the
	 * popover template that displays in the overlay container.  Otherwise, it's difficult
	 * to style the containing popover from outside the component.
	 * @param classes list of class names
	 */
	@Input('panel-classes')
	set inputPanelClasses(classes: string) {
		this.panelClasses = classes;
	}
	/**
	 * This method takes classes set on the host lu-popover element and applies them on the
	 * popover template that displays in the overlay container. Otherwise, it's difficult
	 * to style the containing popover from outside the component.
	 * @param classes list of class names
	 */
	@Input('content-classes')
	set inputContentClasses(classes: string) {
		this.contentClasses = classes;
	}

	/** Event emitted when the popover is closed. */
	@Output() close = new EventEmitter<void>();
	@Output() open = new EventEmitter<void>();
	@Output() hovered = new EventEmitter<boolean>();

	@ViewChild(TemplateRef, { static: true })
	set vcTemplateRef(tr: TemplateRef<any>) {
		this.templateRef = tr;
	}

	constructor() {
		super();
	}

	ngOnDestroy() {
		this.onClose();
		this.close.complete();
	}
	_emitCloseEvent(): void {
		this.close.emit();
	}

	_emitOpenEvent(): void {
		this.open.emit();
	}
	_emitHoveredEvent(hovered: boolean): void {
		this.hovered.emit(hovered);
	}
}
