import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, input, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { ContainerComponent } from '@lucca-front/ng/container';
import { ApprobationInboxHeaderComponent } from '../approbation-inbox-detail-header/approbation-inbox-detail-header.component';
import { NgTemplateOutlet } from '@angular/common';

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
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxDetailComponent {
	readonly insideDialog = input(false, { transform: booleanAttribute });

	readonly headerRef = contentChild(ApprobationInboxHeaderComponent);

	readonly content = viewChild<TemplateRef<unknown>>('contentTpl');
	readonly header = viewChild<TemplateRef<unknown>>('headerTpl');

	readonly titleId = computed(() => this.headerRef()?.titleId);
}
