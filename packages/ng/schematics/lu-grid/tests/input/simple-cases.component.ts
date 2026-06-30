import { Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';

@Component({
	selector: 'lu-test',
	standalone: true,
	template: `
		<button luButton type="button">
			<div class="grid">
				<div class="grid-column" style="--grid-colspan: 6">col</div>
				<div class="grid-column" style="--grid-colspan: 6">col</div>
			</div>
		</button>
		<div class="grid mod-auto">
			<div class="grid-column">auto</div>
			<div class="grid-column">auto</div>
		</div>
		<div class="grid" style="--grid-columns: 1">
			<div class="grid-column" style="--grid-justify: start">start</div>
			<div class="grid-column" style="--grid-justify: end">end</div>
		</div>
		<div class="grid">
			<div class="grid-column" style="--grid-colspan: 12; --grid-colspanAtMediaMinXS: 4">col</div>
			<div class="grid-column" style="--grid-colspan: 12; --grid-colspanAtMediaMinXS: 8">col</div>
		</div>
		<div class="grid mod-form">
			<div class="grid-column"><div class="gridDemo">form</div></div>
		</div>
	`,
	imports: [
		ButtonComponent
	]
})
export class SimpleCasesComponent {
}
