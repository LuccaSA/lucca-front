import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { generateId, intlInputOptions, IntlParamsPipe } from '@lucca-front/ng/core';
import { LuDialogRef } from '@lucca-front/ng/dialog';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { LU_APPROBATION_INBOX_DETAIL_HEADER_TRANSLATIONS } from './approbation-inbox-detail-header.translate';

@Component({
	selector: 'lu-approbation-inbox-detail-header',
	templateUrl: './approbation-inbox-detail-header.component.html',
	encapsulation: ViewEncapsulation.None,
	imports: [TagComponent, StatusBadgeComponent, LuTooltipTriggerDirective, NgTemplateOutlet, IntlParamsPipe],
	host: {
		class: 'approbationInbox-detail-header',
		role: 'generic',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxHeaderComponent {
	protected readonly dialogRef = inject(LuDialogRef, { optional: true });
	readonly label = input.required<string>();

	readonly delegatedBy = input<string | null>(null);

	/**
	 * Displays an overdue status badge next to the title. Ignored when content is projected in [approbationInboxDetailTitleTrailing]
	 */
	readonly overdue = input(false, { transform: booleanAttribute });

	/**
	 * Overrides default translations
	 */
	readonly intl = input(...intlInputOptions(LU_APPROBATION_INBOX_DETAIL_HEADER_TRANSLATIONS));

	readonly actions = viewChild<TemplateRef<unknown>>('actionsTpl');

	readonly titleId = `approbationInboxListTitle-${generateId()}`;
}
