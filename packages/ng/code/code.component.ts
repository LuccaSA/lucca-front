import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-code',
	templateUrl: './code.component.html',
	styleUrl: './code.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class codeComponent {
	block = input(false, { transform: booleanAttribute });
}
