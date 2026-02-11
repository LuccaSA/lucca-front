import { Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { ContainerComponent } from '@lucca-front/ng/container';

@Component({
	selector: 'lu-test',
	standalone: true,
	templateUrl: './external-template.component.html',
	imports: [
		ButtonComponent, ContainerComponent
	]
})
export class SimpleCasesComponent {
}
