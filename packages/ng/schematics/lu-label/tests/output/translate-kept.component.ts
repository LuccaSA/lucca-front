import { Component } from '@angular/core';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { TagComponent } from '@lucca-front/ng/tag';

@Component({
	selector: 'app-translate-kept',
	imports: [TranslateDirective, TranslatePipe, TagComponent],
	template: `
		<lu-tag [label]="'EXPORT_TYPE_LABEL' | translate" palette="neutral" outlined />
		<p translate="EXPORT_DESCRIPTION"></p>
	`,
})
export class TranslateKeptCasesComponent {}
