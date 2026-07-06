import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ContainerComponent } from '@lucca-front/ng/container';
import { LuDialogRef } from '@lucca-front/ng/dialog';

@Component({
	selector: 'lu-approbation-inbox-detail',
	templateUrl: './approbation-inbox-detail.component.html',
	styleUrl: './approbation-inbox-detail.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [ContainerComponent],
	host: {
		class: 'approbationInbox-detail',
		'[class.mod-insideDialog]': 'dialogRef !== null',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxDetailComponent {
	protected readonly dialogRef = inject(LuDialogRef, { optional: true });
}
