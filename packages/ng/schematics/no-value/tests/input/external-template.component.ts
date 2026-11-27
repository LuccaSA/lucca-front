import { Component } from '@angular/core';

@Component({
	selector: 'app-external-template',
	templateUrl: './external-template.component.html',
})
export class ExternalTemplateComponent {
	rows: { name: string; team?: string }[] = [];
}
