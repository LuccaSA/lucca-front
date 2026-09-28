import { CdkDialogContainer } from '@angular/cdk/dialog';
import { afterRenderEffect, ChangeDetectionStrategy, Component, contentChild, Directive, ElementRef, inject, input, OnDestroy, Renderer2, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { intlInputOptions } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuDialogRef } from '../model';
import { LU_DIALOG_HEADER_TRANSLATIONS } from './dialog-header.translate';

let nextId = 0;

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[dialogHeaderAction]',
})
export class DialogHeaderAction {}

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[dialogHeaderSubtitle]',
})
export class DialogHeaderSubtitle {}

@Component({
	selector: 'lu-dialog-header',
	standalone: true,
	imports: [IconComponent, ButtonComponent],
	templateUrl: './dialog-header.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dialog-inside-header',
	},
})
export class DialogHeaderComponent implements OnDestroy {
	#ref = inject(LuDialogRef);

	intl = input(...intlInputOptions(LU_DIALOG_HEADER_TRANSLATIONS));

	dismissible = !this.#ref.config.alert;

	#elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	#renderer = inject(Renderer2);

	#registeredAriaLabelledById: string | undefined;

	constructor() {
		afterRenderEffect(() => this.#syncAriaLabelledBy());
	}

	close(): void {
		this.#ref.dismiss();
	}

	optionalAction = contentChild(DialogHeaderAction);

	optionalSubtitle = contentChild(DialogHeaderSubtitle);

	ngOnDestroy(): void {
		this.#unregisterAriaLabelledBy();
	}

	#syncAriaLabelledBy(): void {
		const header = this.#elementRef.nativeElement.querySelector('h1');
		if (!header) {
			this.#unregisterAriaLabelledBy();
			return;
		}

		const id = header.id || `lu-dialog-header-${nextId++}`;
		if (id === this.#registeredAriaLabelledById) {
			return;
		}

		this.#unregisterAriaLabelledBy();
		this.#renderer.setAttribute(header, 'id', id);
		this.#renderer.addClass(header, 'dialog-inside-header-container-title');
		(this.#ref.cdkRef.containerInstance as CdkDialogContainer)?._addAriaLabelledBy(id);
		this.#registeredAriaLabelledById = id;
	}

	#unregisterAriaLabelledBy(): void {
		if (!this.#registeredAriaLabelledById) {
			return;
		}
		(this.#ref.cdkRef.containerInstance as CdkDialogContainer)?._removeAriaLabelledBy(this.#registeredAriaLabelledById);
		this.#registeredAriaLabelledById = undefined;
	}
}
