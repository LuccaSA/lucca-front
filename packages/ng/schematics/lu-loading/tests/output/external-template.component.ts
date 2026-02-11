import { Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LoadingComponent } from '@lucca-front/ng/loading';

@Component({
	selector: 'lu-test',
	standalone: true,
	templateUrl: './external-template.component.html',
	imports: [
		ButtonComponent, LoadingComponent
	]
})
export class SimpleCasesComponent {
}
