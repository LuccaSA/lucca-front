import { Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { GridComponent } from '@lucca-front/ng/grid';
import { GridColumnComponent } from '@lucca-front/ng/grid';

@Component({
	selector: 'lu-test',
	standalone: true,
	template: `
		<lu-grid>
			<lu-grid-column colspan="6">div col</lu-grid-column>
			<lu-grid-column colspan="6">span col</lu-grid-column>
		</lu-grid>
		<lu-grid mode="auto">
			<lu-grid-column>span auto</lu-grid-column>
		</lu-grid>
		<button class="grid">
			<li class="grid-column">should not migrate</li>
		</button>
	`,
	imports: [
		ButtonComponent, GridComponent, GridColumnComponent
	]
})
export class NeutralElementsOnlyComponent {
}
