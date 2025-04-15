import { Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	selector: 'lu-test',
	standalone: true,
	template: `
		<button luButton>
			<lu-icon icon="signClose" alt="Close"  />
		</button>
	`,
	imports: [
		ButtonComponent, IconComponent
	]
})
export class SimpleCasesComponent {
}
