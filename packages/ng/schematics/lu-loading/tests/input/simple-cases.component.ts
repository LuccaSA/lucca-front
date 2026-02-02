import { Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';

@Component({
	selector: 'lu-test',
	standalone: true,
	template: `
		<button luButton type="button">
			<div class="loading"></div>
			<span class="pr-u-mask">Close</span>
		</button>
		<div class="loading mod-L mod-block mod-invert">loading...</div>
		<div class="loading mod-fullpage"></div>
	`,
	imports: [
		ButtonComponent
	]
})
export class SimpleCasesComponent {
}
