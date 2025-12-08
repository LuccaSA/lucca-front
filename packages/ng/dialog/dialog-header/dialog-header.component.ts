import { CdkDialogContainer } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, contentChild, Directive, ElementRef, inject, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuDialogRef } from '../model';
import { LU_DIALOG_HEADER_TRANSLATIONS } from './dialog-header.translate';

let nextId = 0;

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: '[dialogHeaderAction]',
})
export class DialogHeaderAction {}

@Component({
	selector: 'lu-dialog-header',
	imports: [IconComponent],
	templateUrl: './dialog-header.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dialog-inside-header',
	},
})
export class DialogHeaderComponent implements OnInit {
	#ref = inject(LuDialogRef);

	intl = getIntl(LU_DIALOG_HEADER_TRANSLATIONS);

	dismissible = !this.#ref.config.alert;

	#elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

	#renderer = inject(Renderer2);

	close(): void {
		this.#ref.dismiss();
	}

	optionalAction = contentChild(DialogHeaderAction);

	ngOnInit(): void {
		// Using setTimeout here to make sure this will be handled in the next Cd cycle, not the current one.
		setTimeout(() => {
			const header = this.#elementRef.nativeElement.querySelector('h1');
			const id = header?.id || `lu-dialog-header-${nextId++}`;
			if (header) {
				this.#renderer.setAttribute(header, 'id', id);
				this.#renderer.addClass(header, 'dialog-inside-header-container-title');
			}
			(this.#ref.cdkRef.containerInstance as CdkDialogContainer)?._addAriaLabelledBy(id);
		});
	}
}
