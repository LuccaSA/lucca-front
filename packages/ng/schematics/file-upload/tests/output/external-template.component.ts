import { Component } from '@angular/core';
import { FileEntryWrapperComponent, FileEntryComponent } from '@lucca-front/ng/file-upload';

@Component({
	selector: 'app-external-template',
	imports: [FileEntryComponent, FileEntryWrapperComponent],
	templateUrl: './external-template.component.html',
})
export class ExternalTemplateComponent {}
