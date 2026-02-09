import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-data-presentation',
	imports: [PortalDirective],
	templateUrl: './data-presentation.component.html',
	styleUrl: './data-presentation.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataPresentationComponent {
	readonly label = input.required<PortalContent>();
}
