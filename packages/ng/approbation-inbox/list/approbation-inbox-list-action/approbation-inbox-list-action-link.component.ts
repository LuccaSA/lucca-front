import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { injectMediaMinBreakpoint } from '@lucca-front/ng/core';
import { LuDialogService, provideLuDialog } from '@lucca-front/ng/dialog';
import { ApprobationInboxDetailDialogComponent } from '../../detail/approbation-inbox-detail-dialog/approbation-inbox-detail-dialog.component';
import { APPROBATION_INBOX_LIST_INSTANCE } from '../approbation-inbox-list/token';

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
	private readonly listInstance = inject(APPROBATION_INBOX_LIST_INSTANCE);
	readonly current = input(false, { transform: booleanAttribute });
	readonly dialogService = inject(LuDialogService);

	readonly mediaMinM = injectMediaMinBreakpoint('M');

	openDialog($event: Event) {
		$event.preventDefault();
		this.dialogService.open({
			content: ApprobationInboxDetailDialogComponent,
			data: {
				detailsRef: this.listInstance.detailsComponent(),
			},
			size: 'maxContent',
			mode: 'sheet',
			surfaceDefault: true,
		});
	}
}
