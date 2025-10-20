import { Component } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	selector: 'lu-test',
	template: `
		<lu-icon icon="signClose" />
	`,
	imports: [IconComponent]
})
export class EmptyImportsComponent {
}
