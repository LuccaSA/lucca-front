import { Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	selector: 'lu-test',
	templateUrl: './external-template.component.html',
	imports: [
		ButtonComponent, IconComponent
	]
})
export class SimpleCasesComponent {
}
