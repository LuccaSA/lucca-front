import { Component } from '@angular/core';
import { NoValueComponent } from '@lucca-front/ng/no-value';

@Component({
	selector: 'app-external-template',
	imports: [NoValueComponent],
	templateUrl: './external-template.component.html',
})
export class ExternalTemplateComponent {
	rows: { name: string; team?: string }[] = [];
}
