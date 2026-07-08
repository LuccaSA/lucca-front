import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { ContainerComponent } from '@lucca-front/ng/container';
import { LuDialogRef } from '@lucca-front/ng/dialog';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';

@Component({
	selector: 'lu-approbation-inbox-detail',
	templateUrl: './approbation-inbox-detail.component.html',
	styleUrl: './approbation-inbox-detail.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [ContainerComponent, LuSafeExternalSvgPipe],
	host: {
		class: 'approbationInbox-detail',
		'[class.mod-insideDialog]': 'dialogRef !== null || insideDialog()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxDetailComponent {
	protected readonly dialogRef = inject(LuDialogRef, { optional: true });

	readonly emptyIllustration = input<'magnifying-glass' | 'post-it-success' | string>('magnifying-glass');
	readonly insideDialog = input(false, { transform: booleanAttribute });
}
