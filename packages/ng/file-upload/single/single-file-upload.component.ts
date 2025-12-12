import { booleanAttribute, ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';
import { IntlParamsPipe } from '@lucca-front/ng/core';
import { InputDirective } from '@lucca-front/ng/form-field';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { BaseFileUploadComponent } from '../base-file-upload/base-file-upload.component';
import { FileEntryComponent } from '../file-entry/file-entry.component';
import { FileEntry } from '../file-upload-entry';

@Component({
	selector: 'lu-single-file-upload',
	templateUrl: './single-file-upload.component.html',
	styleUrl: './single-file-upload.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		'[class.mod-structure]': 'structure()',
	},
	imports: [LuSafeExternalSvgPipe, InputDirective, LuTooltipModule, FileEntryComponent, IntlParamsPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleFileUploadComponent extends BaseFileUploadComponent {
	readonly entry = input<FileEntry | null>(null);

	readonly state = input<'loading' | 'success' | 'error' | 'default'>('default');

	readonly inlineMessageError = input<string | null>(null);

	readonly previewUrl = input<string | null>(null);

	readonly deleteFile = output<void>();

	readonly displayFileName = input(false, { transform: booleanAttribute });
}
