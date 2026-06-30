import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-approbation-inbox-list',
	templateUrl: './approbation-inbox-list.component.html',
	styleUrl: './approbation-inbox-list.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [PortalDirective],
	host: {
		class: 'approbationInbox-list',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxListComponent {
	readonly label = input.required<PortalContent>();
}
