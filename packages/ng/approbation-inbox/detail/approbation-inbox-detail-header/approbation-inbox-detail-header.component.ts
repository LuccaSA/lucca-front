import { ChangeDetectionStrategy, Component, inject, input, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { generateId } from '@lucca-front/ng/core';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { NgTemplateOutlet } from '@angular/common';
import { LuDialogRef } from '../../../dialog/model';

@Component({
	selector: 'lu-approbation-inbox-detail-header',
	templateUrl: './approbation-inbox-detail-header.component.html',
	encapsulation: ViewEncapsulation.None,
	imports: [TagComponent, LuTooltipTriggerDirective, NgTemplateOutlet],
	host: {
		class: 'approbationInbox-detail-header',
		role: 'generic',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxHeaderComponent {
	protected readonly dialogRef = inject(LuDialogRef, { optional: true });
	readonly label = input.required<string>();
	readonly delegation = input<string | null>();

	readonly actions = viewChild<TemplateRef<unknown>>('actionsTpl');
	readonly actionsMore = viewChild<TemplateRef<unknown>>('actionsMoreTpl');

	readonly titleId = `approbationInboxListTitle-${generateId()}`;
}
