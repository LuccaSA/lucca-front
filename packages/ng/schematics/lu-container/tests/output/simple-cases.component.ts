import { Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { ContainerComponent } from '@lucca-front/ng/container';

@Component({
	selector: 'lu-test',
	standalone: true,
	template: `
		<button luButton type="button">
			<lu-container />
			<span class="pr-u-mask">Close</span>
		</button>
		<lu-container center overflow max="L">Container</lu-container>
	`,
	imports: [
		ButtonComponent, ContainerComponent
	]
})
export class SimpleCasesComponent {
}
