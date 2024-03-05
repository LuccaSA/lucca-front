import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, Input, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuDialogRef } from '../model';
import { CdkDialogContainer } from '@angular/cdk/dialog';
import { LU_DIALOG_HEADER_TRANSLATIONS } from './dialog-header.translate';
import { getIntl } from '@lucca-front/ng/core';

let nextId = 0;

@Component({
	selector: 'lu-dialog-header',
	standalone: true,
	imports: [IconComponent, ButtonComponent, NgIf],
	templateUrl: './dialog-header.component.html',
	styleUrl: './dialog-header.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'dialog-inside-header',
		role: 'header',
	},
})
export class DialogHeaderComponent implements OnInit {
	#ref = inject(LuDialogRef);

	intl = getIntl(LU_DIALOG_HEADER_TRANSLATIONS);

	@Input('id')
	id: string;

	dismissible = !this.#ref.config.alert;

	#elementRef = inject(ElementRef);

	#renderer = inject(Renderer2);

	close(): void {
		this.#ref.dismiss();
	}

	ngOnInit(): void {
		// Using setTimeout here to make sure this will be handled in the next Cd cycle, not the current one.
		setTimeout(() => {
			if (!this.id) {
				this.id = `lu-dialog-header-${nextId++}`;
			}
			const header = this.#elementRef.nativeElement.querySelector('h1');
			if (header) {
				this.#renderer.setAttribute(header, 'id', this.id);
				this.#renderer.addClass(header, 'dialog-inside-header-container-title');
			}
			// TODO change this to _addAriaLabelledBy once cdk is > 17.1
			(this.#ref.cdkRef.containerInstance as CdkDialogContainer)._ariaLabelledByQueue.push(this.id);
		});
	}
}
