import { ChangeDetectionStrategy, Component, forwardRef, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute, PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { InputFramedSize } from './input-framed.type';
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
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFramedComponent {
	/**
	 * Content displayed in the frame below the field
	 */
	readonly framedPortal = input<PortalContent | null>(null);
	/**
	 * Centers the content of the frame
	 */
	readonly center = input(false, { transform: luBooleanAttribute });
	/**
	 * Changes the size of the component
	 */
	readonly size = input<InputFramedSize | null>(null);
}
