import { ChangeDetectionStrategy, Component, contentChild, ViewEncapsulation } from '@angular/core';
import { BubbleIllustrationComponent } from '@lucca-front/ng/bubble-illustration';
import { IntlParamsPipe } from '@lucca-front/ng/core';
import { InputDirective } from '@lucca-front/ng/form-field';
import { BaseFileUploadComponent } from '../base-file-upload/base-file-upload.component';
import { FileEntryComponent } from '../file-entry/file-entry.component';

@Component({
	selector: 'lu-single-file-upload',
	templateUrl: './single-file-upload.component.html',
	styleUrl: './single-file-upload.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [InputDirective, IntlParamsPipe, BubbleIllustrationComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleFileUploadComponent extends BaseFileUploadComponent {
	/**
	 * The `lu-file-entry` projected by the consumer. When present, the dropzone
	 * is hidden and replaced in-place by the entry.
	 *
	 * Like `lu-multi-file-upload`, the consumer owns the `lu-file-entry` rather than
	 * the upload component rendering it. Multi renders its entries as a sibling list
	 * (the dropzone stays visible), so it needs no query; single's entry takes the
	 * dropzone's place, so we detect it here to toggle the dropzone off.
	 */
	readonly fileEntry = contentChild(FileEntryComponent);
}
