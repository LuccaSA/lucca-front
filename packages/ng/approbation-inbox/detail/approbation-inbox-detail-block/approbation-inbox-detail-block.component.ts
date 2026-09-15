import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { DividerComponent } from '@lucca-front/ng/divider';

@Component({
	selector: 'lu-approbation-inbox-detail-main-block',
	templateUrl: './approbation-inbox-detail-block.component.html',
	encapsulation: ViewEncapsulation.None,
	imports: [DividerComponent],
	host: {
		class: 'approbationInbox-detail-main-block',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxDetailMainBlockComponent {
	readonly label = input.required<string>();
}
