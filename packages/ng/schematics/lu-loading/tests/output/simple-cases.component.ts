import { Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LoadingComponent } from '@lucca-front/ng/loading';

@Component({
	selector: 'lu-test',
	standalone: true,
	template: `
		<button luButton type="button">
			<lu-loading />
			<span class="pr-u-mask">Close</span>
		</button>
		<lu-loading block invert size="L">loading...</lu-loading>
		<lu-loading template="fullPage" />
	`,
	imports: [
		ButtonComponent, LoadingComponent
	]
})
export class SimpleCasesComponent {
}
