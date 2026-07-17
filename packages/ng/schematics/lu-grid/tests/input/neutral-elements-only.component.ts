import { Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';

@Component({
	selector: 'lu-test',
	standalone: true,
	template: `
		<div class="grid">
			<div class="grid-column" style="--grid-colspan: 6">div col</div>
			<span class="grid-column" style="--grid-colspan: 6">span col</span>
		</div>
		<span class="grid mod-auto">
			<span class="grid-column">span auto</span>
		</span>
		<button class="grid">
			<li class="grid-column">should not migrate</li>
		</button>
	`,
	imports: [
		ButtonComponent
	]
})
export class NeutralElementsOnlyComponent {
}
