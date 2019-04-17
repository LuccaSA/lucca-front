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
	LuPopoverScrollStrategy,
	ALuPopoverPanel,
} from './popover-panel.model';
import { luTransformPopover } from '../animation/index';


// import { standardPopoverTemplate } from './popover.template';

@Component({
	selector: 'lu-popover',
	templateUrl: './popover-panel.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [luTransformPopover],
	exportAs: 'LuPopoverPanel',
})
export class LuPopoverPanelComponent extends ALuPopoverPanel implements ILuPopoverPanel, OnDestroy {

	protected _template: TemplateRef<any>;
	/** Template to Use for the popover */
	get template(): TemplateRef<any> {
		return this._template;
	}
	@Input()
	set template(value: TemplateRef<any>) {
		this._template = value;
	}

	/**
	 * Popover container close on click
	 * default: false
	 */
	@Input('close-on-click')
	set inputCloseOnClick(v: boolean) {
		this.closeOnClick = v;
	}

	/**
	 * Popover focus trap using cdkTrapFocus
	 * default: false
	 */
	@Input('focus-trap-enabled')
	set inputFocusTrapEnabled(v: boolean) {
		this.focusTrapEnabled = v;
	}

	/**
	 * Popover scrollStrategy
	 * default: reposition
	 */
	@Input('scroll-strategy')
	set inputScrollStrategy(v: LuPopoverScrollStrategy) {
		this.scrollStrategy = v;
	}

	/**
	 * This method takes classes set on the host lu-popover element and applies them on the
	 * popover template that displays in the overlay container.  Otherwise, it's difficult
	 * to style the containing popover from outside the component.
	 * @param classes list of class names
	 */
	@Input('panelClasses')
	set inputClasses(classes: string) {
		if (classes && classes.length) {
			this.panelClasses = classes
				.split(' ')
				.reduce((obj: any, className: string) => {
					obj[className] = true;
					return obj;
				}, {});
		}
	}

	/**
	 * Add classes to the overlay pane.
	 * @param classes list or single class name
	 */
	@Input('overlayPaneClass')
	set overlayPaneClass(classes: string | string[]) {
		if (classes) {
			this.overlayPaneClass = classes;
		}
	}

	/** Event emitted when the popover is closed. */
	@Output() close = new EventEmitter<void>();
	@Output() open = new EventEmitter<void>();

	@ViewChild(TemplateRef)
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
}
