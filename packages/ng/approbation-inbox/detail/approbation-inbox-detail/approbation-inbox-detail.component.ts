import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, inject, input, ViewEncapsulation } from '@angular/core';
import { ContainerComponent } from '@lucca-front/ng/container';
import { LuDialogRef } from '@lucca-front/ng/dialog';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { ApprobationInboxHeaderComponent } from '../approbation-inbox-detail-header/approbation-inbox-detail-header.component';

@Component({
	selector: 'lu-approbation-inbox-detail',
	templateUrl: './approbation-inbox-detail.component.html',
	styleUrl: './approbation-inbox-detail.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [ContainerComponent, LuSafeExternalSvgPipe],
	host: {
		class: 'approbationInbox-detail',
		role: 'region',
		'[class.mod-insideDialog]': 'dialogRef !== null || insideDialog()',
		'[attr.aria-labelledby]': 'titleId()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxDetailComponent {
	protected readonly dialogRef = inject(LuDialogRef, { optional: true });

	readonly insideDialog = input(false, { transform: booleanAttribute });

	private readonly header = contentChild(ApprobationInboxHeaderComponent);
	readonly titleId = computed(() => this.header()?.titleId);
}
