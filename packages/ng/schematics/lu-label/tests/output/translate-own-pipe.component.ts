import { Component } from '@angular/core';
import { TranslatePipe } from '@structure/i18n';
import { TagComponent } from '@lucca-front/ng/tag';

@Component({
	selector: 'app-translate-own-pipe',
	imports: [TranslatePipe, TagComponent],
	template: `
		<lu-tag [label]="'NO_USER_IN_DEPARTMENT' | translate" palette="neutral" outlined />
	`,
})
export class TranslateOwnPipeCasesComponent {}
