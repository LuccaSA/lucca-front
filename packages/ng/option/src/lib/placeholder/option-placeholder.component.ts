import { Component, EventEmitter, Output } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { LU_OPTION_PLACEHOLDER_TRANSLATIONS } from './option-placeholder.translate';

@Component({
	selector: 'lu-option-placeholder',
	templateUrl: './option-placeholder.component.html',
	styleUrls: ['./option-placeholder.component.scss'],
	standalone: true,
})
export class LuOptionPlaceholderComponent {
	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	@Output() onClear = new EventEmitter();

	public intl = getIntl(LU_OPTION_PLACEHOLDER_TRANSLATIONS);

	clear() {
		this.onClear.emit();
	}
}
