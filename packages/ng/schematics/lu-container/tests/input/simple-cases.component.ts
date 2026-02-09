import { Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';

@Component({
	selector: 'lu-test',
	standalone: true,
	template: `
		<button luButton type="button">
			<div class="container"></div>
			<span class="pr-u-mask">Close</span>
		</button>
		<div class="container mod-maxL mod-center mod-overflow">Container</div>
	`,
	imports: [
		ButtonComponent
	]
})
export class SimpleCasesComponent {
}
