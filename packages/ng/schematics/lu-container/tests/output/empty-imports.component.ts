import { Component } from '@angular/core';
import { ContainerComponent } from '@lucca-front/ng/container';

@Component({
	selector: 'lu-test',
	standalone: true,
	template: `
		<lu-container />
	`,
	imports: [ContainerComponent]
})
export class EmptyImportsComponent {
}
