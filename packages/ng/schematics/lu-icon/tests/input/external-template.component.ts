import { Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';

@Component({
	selector: 'lu-test',
	templateUrl: './external-template.component.html',
	imports: [
		ButtonComponent
	]
})
export class SimpleCasesComponent {
}
