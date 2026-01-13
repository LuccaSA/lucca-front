import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-code',
	templateUrl: './code.component.html',
	styleUrl: './code.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeComponent {
	/**
	 * Display code in block
	 */
	readonly block = input(false, { transform: booleanAttribute });
}
