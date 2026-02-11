import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BubbleIllustrationComponent } from '@lucca-front/ng/bubble-illustration';
import { IntlParamsPipe } from '@lucca-front/ng/core';
import { BaseFileUploadComponent } from '../base-file-upload/base-file-upload.component';

@Component({
	selector: 'lu-file-dropzone',
	templateUrl: './file-dropzone.component.html',
	styleUrl: './file-dropzone.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [IntlParamsPipe, BubbleIllustrationComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileDropzoneComponent extends BaseFileUploadComponent {}
