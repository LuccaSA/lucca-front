import { booleanAttribute, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-code',
	standalone: true,
	templateUrl: './code.component.html',
	styleUrl: './code.component.scss',
	encapsulation: ViewEncapsulation.None,
})
export class codeComponent {
	block = input(false, { transform: booleanAttribute });
}
