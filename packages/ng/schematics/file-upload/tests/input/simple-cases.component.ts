import { Component } from '@angular/core';
import { SingleFileUploadComponent } from '@lucca-front/ng/file-upload';

@Component({
	selector: 'app-simple-cases',
	imports: [SingleFileUploadComponent],
	template: `
		<lu-single-file-upload [entry]="file" [state]="state" (deleteFile)="delete()" [accept]="accept" />
		<lu-single-file-upload size="S" [entry]="file" [previewUrl]="preview" />
		<lu-multi-file-upload size="S" [droppable]="true" />
		<div class="fileEntryDisplayWrapper">
			<lu-file-entry [entry]="file" />
		</div>
		<div class="fileEntryDisplayWrapper pr-u-marginTop100"></div>
		<lu-single-file-upload [size]="isCompact ? 'S' : null" [entry]="file" />
	`,
})
export class SimpleCasesComponent {}
