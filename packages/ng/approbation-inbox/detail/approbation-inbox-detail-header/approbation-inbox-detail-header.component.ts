import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { generateId } from '@lucca-front/ng/core';
import { LuDialogRef } from '@lucca-front/ng/dialog';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';

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

	readonly titleId = `approbationInboxListTitle-${generateId()}`;
}
