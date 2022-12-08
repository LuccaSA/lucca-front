import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { LuOptionPlaceholderIntl } from './option-placeholder.intl';
import { LU_OPTION_PLACEHOLDER_TRANSLATIONS } from './option-placeholder.token';
import { ILuOptionPlaceholderLabel, luOptionPlaceholderTranslations } from './option-placeholder.translate';

@Component({
	selector: 'lu-option-placeholder',
	templateUrl: './option-placeholder.component.html',
	styleUrls: ['./option-placeholder.component.scss'],
	standalone: true,
	providers: [
		LuOptionPlaceholderIntl,
		{
			provide: LU_OPTION_PLACEHOLDER_TRANSLATIONS,
			useValue: luOptionPlaceholderTranslations,
		},
	],
})
export class LuOptionPlaceholderComponent {
	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	@Output() onClear = new EventEmitter();

	constructor(@Inject(LuOptionPlaceholderIntl) public intl: ILuOptionPlaceholderLabel) {}

	clear() {
		this.onClear.emit();
	}
}
