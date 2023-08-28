import { booleanAttribute, Component, Input } from '@angular/core';
import { PortalComponent, PortalContent } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-footer',
	standalone: true,
	imports: [PortalComponent],
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
	@Input({
		transform: booleanAttribute,
	})
	/**
	 * Should the footer be sticky?
	 */
	sticky = false;

	@Input()
	/**
	 * Optional content to display in the footer's cotnent slot
	 */
	content: PortalContent;
}
