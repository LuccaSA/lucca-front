import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { generateId } from '@lucca-front/ng/core';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';

@Component({
	selector: 'lu-approbation-inbox-detail-header',
	templateUrl: './approbation-inbox-detail-header.component.html',
	encapsulation: ViewEncapsulation.None,
	imports: [TagComponent, LuTooltipTriggerDirective],
	host: {
		class: 'approbationInbox-detail-header',
		role: 'generic',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxHeaderComponent {
	readonly label = input.required<string>();
	readonly delegation = input<string | null>();

	readonly titleId = `approbationInboxListTitle-${generateId()}`;
}
