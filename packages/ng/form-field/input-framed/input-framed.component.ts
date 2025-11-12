import { booleanAttribute, Component, forwardRef, input, ViewEncapsulation } from '@angular/core';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { INPUT_FRAMED_INSTANCE } from './input-framed.token';

@Component({
	selector: 'lu-input-framed',
	imports: [PortalDirective],
	templateUrl: './input-framed.component.html',
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: INPUT_FRAMED_INSTANCE,
			useExisting: forwardRef(() => InputFramedComponent),
		},
	],
})
export class InputFramedComponent {
	framedPortal = input<PortalContent | null>(null);
	center = input(false, { transform: booleanAttribute });
	size = input<'L' | null>(null);
}
