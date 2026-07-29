import { Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { GridComponent } from '@lucca-front/ng/grid';
import { GridColumnComponent } from '@lucca-front/ng/grid';

@Component({
	selector: 'lu-test',
	standalone: true,
	templateUrl: './external-template.component.html',
	imports: [
		ButtonComponent, GridComponent, GridColumnComponent
	]
})
export class ExternalTemplateComponent {
}
