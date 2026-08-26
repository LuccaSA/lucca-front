import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { generateId, getIntl, IntlParamsPipe } from '@lucca-front/ng/core';
import { LuDialogRef } from '@lucca-front/ng/dialog';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { LU_APPROBATION_INBOX_DETAIL_HEADER_TRANSLATIONS } from './approbation-inbox-detail-header.translate';

@Component({
	selector: 'lu-approbation-inbox-detail-header',
	templateUrl: './approbation-inbox-detail-header.component.html',
	encapsulation: ViewEncapsulation.None,
	imports: [TagComponent, LuTooltipTriggerDirective, NgTemplateOutlet, IntlParamsPipe],
	host: {
		class: 'approbationInbox-detail-header',
		role: 'generic',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxHeaderComponent {
	protected readonly dialogRef = inject(LuDialogRef, { optional: true });
	protected readonly intl = getIntl(LU_APPROBATION_INBOX_DETAIL_HEADER_TRANSLATIONS);

	readonly label = input.required<string>();

	readonly delegatedBy = input<string | null>(null);

	readonly actions = viewChild<TemplateRef<unknown>>('actionsTpl');

	readonly titleId = `approbationInboxListTitle-${generateId()}`;
}
