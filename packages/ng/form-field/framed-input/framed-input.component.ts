import { Component, forwardRef, input, ViewEncapsulation } from '@angular/core';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { FRAMED_INPUT_INSTANCE } from './framed-input-token';

@Component({
	selector: 'lu-framed-input',
	standalone: true,
	imports: [PortalDirective],
	templateUrl: './framed-input.component.html',
	styleUrl: './framed-input.component.scss',
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
	align = input<'top' | 'center'>('top');
}
