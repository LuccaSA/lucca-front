import { Directive, HostListener, inject, Input, TemplateRef } from '@angular/core';
import { LuDialogService } from '../dialog.service';
import { LuDialogConfig } from '../model';
import { provideLuDialog } from '../dialog.providers';

@Directive({
	selector: '[luDialogOpen]',
	standalone: true,
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
			content: this.dialog,
			...this.luDialogConfig,
		});
	}
}
