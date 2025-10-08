import { booleanAttribute, Component, input, output, ViewEncapsulation } from '@angular/core';
import { IntlParamsPipe } from '@lucca-front/ng/core';
import { InputDirective } from '@lucca-front/ng/form-field';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { BaseFileUploadComponent } from '../base-file-upload/base-file-upload.component';
import { FileEntryComponent } from '../file-entry/file-entry.component';
import { FileEntry } from '../file-upload-entry';

@Component({
	selector: 'lu-single-file-upload',
	standalone: true,
	templateUrl: './single-file-upload.component.html',
	styleUrl: './single-file-upload.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		'[class.mod-structure]': 'structure()',
	},
	imports: [LuSafeExternalSvgPipe, InputDirective, LuTooltipModule, FileEntryComponent, IntlParamsPipe],
})
export class SingleFileUploadComponent extends BaseFileUploadComponent {
	entry = input<FileEntry | null>(null);

	state = input<'loading' | 'success' | 'error' | null>(null);

	inlineMessageError = input<string | null>(null);

	previewUrl = input<string | null>(null);

	deleteFile = output<void>();

	displayFileName = input(false, { transform: booleanAttribute });
}
