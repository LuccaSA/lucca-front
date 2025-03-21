import { Component, ViewEncapsulation } from '@angular/core';
import { IntlParamsPipe } from '@lucca-front/ng/core';
import { InputDirective } from '@lucca-front/ng/form-field';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { BaseFileUploadComponent } from '../base-file-upload/base-file-upload.component';

@Component({
	selector: 'lu-multi-file-upload',
	standalone: true,
	templateUrl: './multi-file-upload.component.html',
	styleUrls: ['./multi-file-upload.component.scss'],
	encapsulation: ViewEncapsulation.None,
	imports: [LuSafeExternalSvgPipe, InputDirective, LuTooltipModule, IntlParamsPipe],
})
export class MultiFileUploadComponent extends BaseFileUploadComponent {}
