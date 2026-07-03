import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ContainerComponent } from '@lucca-front/ng/container';

@Component({
	selector: 'lu-approbation-inbox-detail',
	templateUrl: './approbation-inbox-detail.component.html',
	styleUrl: './approbation-inbox-detail.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [ContainerComponent],
	host: {
		class: 'approbationInbox-detail',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxDetailComponent {}
