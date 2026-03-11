import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BubbleIllustrationComponent } from '@lucca-front/ng/bubble-illustration';
import { IntlParamsPipe } from '@lucca-front/ng/core';
import { InputDirective } from '@lucca-front/ng/form-field';
import { BaseFileUploadComponent } from '../base-file-upload/base-file-upload.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'lu-single-file-upload',
	templateUrl: './single-file-upload.component.html',
	styleUrl: './single-file-upload.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		'[class.mod-structure]': 'structure()',
	},
	imports: [InputDirective, IntlParamsPipe, BubbleIllustrationComponent],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: SingleFileUploadComponent,
			multi: true,
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleFileUploadComponent extends BaseFileUploadComponent {}
