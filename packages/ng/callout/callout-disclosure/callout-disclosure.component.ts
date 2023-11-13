import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuccaIcon } from '@lucca-front/icons';
import { Palette, PortalContent, PortalDirective } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-callout-disclosure',
	standalone: true,
	imports: [CommonModule, IconComponent, PortalDirective],
	templateUrl: './callout-disclosure.component.html',
	styleUrls: ['./callout-disclosure.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalloutDisclosureComponent {
	@Input()
	icon: LuccaIcon | null = 'signInfo';

	@Input({ required: true })
	heading: PortalContent;

	@Input()
	palette: Palette = 'none';

	@Input()
	size: 'M' | 'S' = 'M';
}
