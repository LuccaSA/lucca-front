import { Directive, inject, input, TemplateRef } from '@angular/core';
import { provideLuDialog } from '../dialog.providers';
import { LuDialogService } from '../dialog.service';
import { LuDialogConfig } from '../model';

@Directive({
	selector: '[luDialogOpen]',
	providers: [provideLuDialog()],
	host: {
		'(click)': 'click()',
	},
})
export class DialogOpenDirective {
	#dialogService = inject(LuDialogService);

	readonly dialog = input.required<TemplateRef<void>>({ alias: 'luDialogOpen' });

	readonly luDialogConfig = input();

	click() {
		this.#dialogService.open({
			...(this.luDialogConfig() as LuDialogConfig<unknown>),
			content: this.dialog(),
		});
	}
}
