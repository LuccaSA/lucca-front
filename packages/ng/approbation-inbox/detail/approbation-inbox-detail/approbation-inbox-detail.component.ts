import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, inject, input, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { ContainerComponent } from '@lucca-front/ng/container';
import { LuDialogRef } from '@lucca-front/ng/dialog';
import { ApprobationInboxHeaderComponent } from '../approbation-inbox-detail-header/approbation-inbox-detail-header.component';

@Component({
	selector: 'lu-approbation-inbox-detail',
	templateUrl: './approbation-inbox-detail.component.html',
	styleUrl: './approbation-inbox-detail.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [ContainerComponent, NgTemplateOutlet],
	host: {
		class: 'approbationInbox-detail',
		role: 'region',
		'[attr.aria-labelledby]': 'titleId()',
		'[class.mod-insideDialog]': 'insideDialog()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxDetailComponent {
	protected readonly dialogRef = inject(LuDialogRef, { optional: true });

	readonly insideDialog = input(this.dialogRef !== null, { transform: booleanAttribute });

	readonly headerRef = contentChild(ApprobationInboxHeaderComponent);

	readonly content = viewChild<TemplateRef<unknown>>('contentTpl');
	readonly header = viewChild<TemplateRef<unknown>>('headerTpl');

	readonly titleId = computed(() => this.headerRef()?.titleId);
}
