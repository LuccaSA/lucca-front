import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-code',
	templateUrl: './code.component.html',
	styleUrl: './code.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeComponent {
	readonly block = input(false, { transform: luBooleanAttribute });
}
