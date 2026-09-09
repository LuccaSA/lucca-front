import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { IconComponent, LuccaIcon } from '@lucca/prisme/icon';

export interface ApprobationInboxIcon {
	icon: LuccaIcon;
	alt: string;
	state?: 'warning' | 'critical' | 'success';
}

@Component({
	selector: 'lu-approbation-inbox-list-icons',
	templateUrl: './approbation-inbox-list-icons.component.html',
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, LuTooltipTriggerDirective],
	host: {
		class: 'pr-u-displayContents',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxIconsComponent {
	readonly icons = input<readonly ApprobationInboxIcon[]>([]);
}
