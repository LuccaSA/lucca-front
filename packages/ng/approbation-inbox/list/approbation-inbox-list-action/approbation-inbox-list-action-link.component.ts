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
		'(click)': 'mediaMinM() ? null : openDialog($event)',
	},
	providers: [provideLuDialog()],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxLinkComponent {
	readonly current = input(false, { transform: booleanAttribute });
	readonly detailTpl = input<TemplateRef<unknown>>();
	readonly detailActionsTpl = input<TemplateRef<unknown>>();
	readonly dialogService = inject(LuDialogService);

	readonly mediaMinM = injectMediaMinBreakpoint('M');

	openDialog($event: Event) {
		$event.preventDefault();
		// TODO inbox: open dialog with detailTpl and detailActionsTpl
		// this.dialogService.open;
	}
}
