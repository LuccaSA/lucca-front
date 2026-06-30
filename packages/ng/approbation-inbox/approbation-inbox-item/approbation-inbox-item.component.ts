import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-approbation-inbox-item',
	templateUrl: './approbation-inbox-item.component.html',
	styleUrl: './approbation-inbox-item.component.scss',
	encapsulation: ViewEncapsulation.None,

	host: {
		class: 'approbationInbox-list-item',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxItemComponent {
	readonly selectable = input(false, { transform: booleanAttribute });
	readonly center = input(false, { transform: booleanAttribute });
}
