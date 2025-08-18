import { Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';

@Component({
	selector: 'lu-test',
	standalone: true,
	template: `
		<button luButton type="button">
			<span aria-hidden="true" class="lucca-icon icon-signClose"></span>
			<span class="pr-u-mask">Close</span>
		</button>
		<span aria-hidden="true" class="lucca-icon icon-signClose mod-S"></span>
		<span aria-hidden="true" class="lucca-icon icon-signClose keepme"></span>
	`,
	imports: [
		ButtonComponent
	]
})
export class SimpleCasesComponent {
}
