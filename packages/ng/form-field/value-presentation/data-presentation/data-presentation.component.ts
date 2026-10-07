import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute, PortalContent, PortalDirective } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-data-presentation',
	imports: [PortalDirective],
	templateUrl: './data-presentation.component.html',
	styleUrl: './data-presentation.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataPresentationComponent {
	/**
	 * Label of the data (term), the value being the projected content
	 */
	readonly label = input.required<PortalContent>();
	/**
	 * Displays a dash when there is no value
	 */
	readonly noValue = input(false, { transform: luBooleanAttribute });
	/**
	 * Changes the size of the component
	 */
	readonly size = input<'S' | null>(null);
}
