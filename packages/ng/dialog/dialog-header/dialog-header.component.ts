import { CdkDialogContainer } from '@angular/cdk/dialog';
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { getIntl } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuDialogRef } from '../model';
import { LU_DIALOG_HEADER_TRANSLATIONS } from './dialog-header.translate';

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

	ngOnInit(): void {
		// Using setTimeout here to make sure this will be handled in the next Cd cycle, not the current one.
		setTimeout(() => {
			const header = this.#elementRef.nativeElement.querySelector('h1');
			const id = header?.id || `lu-dialog-header-${nextId++}`;
			if (header) {
				this.#renderer.setAttribute(header, 'id', id);
				this.#renderer.addClass(header, 'dialog-inside-header-container-title');
			}
			// TODO change this to _addAriaLabelledBy once cdk is > 17.1
			(this.#ref.cdkRef.containerInstance as CdkDialogContainer)._ariaLabelledByQueue.push(id);
		});
	}
}
