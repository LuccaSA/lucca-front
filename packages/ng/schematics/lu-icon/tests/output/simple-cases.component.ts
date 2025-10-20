import { Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	selector: 'lu-test',
	template: `
		<button luButton type="button">
			<lu-icon icon="signClose" alt="Close" />
		</button>
		<lu-icon icon="signClose" size="S" />
		<lu-icon icon="signClose" class="keepme"/>
	`,
	imports: [
		ButtonComponent, IconComponent
	]
})
export class SimpleCasesComponent {
}
