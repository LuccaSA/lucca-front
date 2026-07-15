import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { injectMediaMinBreakpoint } from '@lucca-front/ng/core';
import { LuDialogService, provideLuDialog } from '@lucca-front/ng/dialog';

@Component({
	selector: 'a[lu-approbation-inbox-list-action]',
	template: '<ng-content />',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'approbationInbox-list-content-items-item-content-action',
		'[attr.aria-current]': 'mediaMinM() && current() ? "page" : null',
		'[attr.role]': '!mediaMinM() ? "button" : null',
		'(click)': 'mediaMinM() ? null : openDialog()',
	},
	providers: [provideLuDialog()],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxLinkComponent {
	readonly current = input(false, { transform: booleanAttribute });
	readonly dialogTpl = input<TemplateRef<unknown>>();
	readonly dialogService = inject(LuDialogService);

	readonly mediaMinM = injectMediaMinBreakpoint('M');

	openDialog() {
		// this.dialogService.open;
	}
}
