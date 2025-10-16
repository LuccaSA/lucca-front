import { booleanAttribute, Component, forwardRef, input, ViewEncapsulation } from '@angular/core';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { FRAMED_INPUT_INSTANCE } from './framed-input-token';

@Component({
	selector: 'lu-framed-input',
	imports: [PortalDirective],
	templateUrl: './framed-input.component.html',
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: FRAMED_INPUT_INSTANCE,
			useExisting: forwardRef(() => FramedInputComponent),
		},
	],
})
export class FramedInputComponent {
	framedPortal = input<PortalContent | null>(null);
	center = input(false, { transform: booleanAttribute });
}
