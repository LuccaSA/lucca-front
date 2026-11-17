import { Component } from '@angular/core';
import { TranslateDirective } from '@ngx-translate/core';
import { TranslatePipe } from '@structure/i18n';

@Component({
	selector: 'app-translate-own-pipe',
	imports: [TranslateDirective, TranslatePipe],
	template: `
		<span class="label palette-neutral" translate="NO_USER_IN_DEPARTMENT"></span>
	`,
})
export class TranslateOwnPipeCasesComponent {}
