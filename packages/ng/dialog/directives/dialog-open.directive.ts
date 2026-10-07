import { Directive, inject, input, TemplateRef } from '@angular/core';
import { provideLuDialog } from '../dialog.providers';
import { LuDialogService } from '../dialog.service';
import { LuDialogConfig } from '../model';

@Directive({
	selector: '[luDialogOpen]',
	providers: [provideLuDialog()],
	host: {
		'(click)': 'click()',
		'[attr.aria-haspopup]': '"dialog"',
	},
})
export class DialogOpenDirective {
	#dialogService = inject(LuDialogService);

	/**
	 * Template to display in the dialog opened on click.
	 */
	readonly dialog = input.required<TemplateRef<void>>({ alias: 'luDialogOpen' });

	/**
	 * Configuration of the dialog opened on click (size, mode, alert...).
	 */
	readonly luDialogConfig = input<LuDialogConfig<unknown>>();

	click() {
		this.#dialogService.open({
			...this.luDialogConfig(),
			content: this.dialog(),
		});
	}
}
