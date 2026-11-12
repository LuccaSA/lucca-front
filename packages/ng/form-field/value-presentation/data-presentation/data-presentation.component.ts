import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute, PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { ɵPresentationNoValueComponent } from '../presentation-no-value/presentation-no-value.component';

@Component({
	selector: 'lu-data-presentation',
	imports: [PortalDirective, ɵPresentationNoValueComponent],
	templateUrl: './data-presentation.component.html',
	styleUrl: './data-presentation.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataPresentationComponent {
	readonly label = input.required<PortalContent>();
	readonly noValue = input(false, { transform: luBooleanAttribute });
	readonly size = input<'S' | null>(null);
}
