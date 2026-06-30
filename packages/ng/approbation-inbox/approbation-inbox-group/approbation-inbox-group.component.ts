import { ChangeDetectionStrategy, Component, input, model, ViewEncapsulation } from '@angular/core';
import { IconComponent } from '@lucca/prisme/icon';

@Component({
	selector: 'lu-approbation-inbox-group',
	templateUrl: './approbation-inbox-group.component.html',
	styleUrl: './approbation-inbox-group.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent],
	host: {
		class: 'approbationInbox-list-groupOptional',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxGroupComponent {
	readonly label = input.required<string>();
	readonly expanded = model(false);

	expandedToggle() {
		this.expanded.set(!this.expanded());
	}
}
