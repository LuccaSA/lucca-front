import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { DividerComponent } from '@lucca-front/ng/divider';

@Component({
	selector: 'lu-approbation-inbox-details-main-block',
	templateUrl: './approbation-inbox-details-main-block.component.html',
	styleUrl: './approbation-inbox-details-main-block.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [DividerComponent],
	host: {
		class: 'approbationInbox-details-main-block',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxDetailsMainBlockComponent {
	readonly label = input.required<string>();
}
