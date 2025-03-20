import { Component, ViewEncapsulation } from '@angular/core';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { BaseFileUploadComponent } from '../base-file-upload/base-file-upload.component';

@Component({
	selector: 'lu-file-dropzone',
	standalone: true,
	templateUrl: './file-dropzone.component.html',
	styleUrls: ['./file-dropzone.component.scss'],
	encapsulation: ViewEncapsulation.None,
	imports: [LuSafeExternalSvgPipe],
	host: {
		class: 'u-displayContents',
	},
})
export class FileDropzoneComponent extends BaseFileUploadComponent {}
