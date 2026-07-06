import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { TagComponent } from '@lucca-front/ng/tag';
import { ButtonComponent } from '@lucca/prisme/button';
import { IconComponent } from '@lucca/prisme/icon';

@Component({
	selector: 'lu-approbation-inbox-detail-header',
	templateUrl: './approbation-inbox-header.component.html',
	styleUrl: './approbation-inbox-header.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [ButtonComponent, IconComponent, TagComponent],
	host: {
		class: 'approbationInbox-detail-header',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxHeaderComponent {
	readonly label = input.required<string>();
	readonly delegation = input<string | null>();
}
