import { Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LoadingComponent } from '@lucca-front/ng/loading';

@Component({
	selector: 'lu-test',
	standalone: true,
	template: `
		<button luButton type="button">
			<lu-loading />
		</button>
		<lu-loading size="L" block invert>loading...</lu-loading>
		<lu-loading format="fullPage" />
	`,
	imports: [
		ButtonComponent, LoadingComponent
	]
})
export class SimpleCasesComponent {
}
