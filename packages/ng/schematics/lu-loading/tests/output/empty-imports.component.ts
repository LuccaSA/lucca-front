import { Component } from '@angular/core';
import { LoadingComponent } from '@lucca-front/ng/loading';

@Component({
	selector: 'lu-test',
	standalone: true,
	template: `
		<lu-loading />
	`,
	imports: [LoadingComponent]
})
export class EmptyImportsComponent {
}
