import { Directive, HostListener, inject, Input, TemplateRef } from '@angular/core';
import { provideLuDialog } from '../dialog.providers';
import { LuDialogService } from '../dialog.service';
import { LuDialogConfig } from '../model';

@Directive({
	selector: '[luDialogOpen]',
	providers: [provideLuDialog()],
})
export class DialogOpenDirective {
	#dialogService = inject(LuDialogService);

	@Input({
		required: true,
		alias: 'luDialogOpen',
	})
	dialog: TemplateRef<void>;

	@Input()
	luDialogConfig: LuDialogConfig<unknown>;

	@HostListener('click')
	click(): void {
		this.#dialogService.open({
			...this.luDialogConfig,
			content: this.dialog,
		});
	}
}
