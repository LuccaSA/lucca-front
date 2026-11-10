import { ChangeDetectionStrategy, Component, EventEmitter, input, Output } from '@angular/core';
import { intlInputOptions } from '@lucca-front/ng/core';
import { LU_OPTION_PLACEHOLDER_TRANSLATIONS } from './option-placeholder.translate';

/**
 * @deprecated since 20.2.0; use LuSimpleSelectInputComponent or LuMultiSelectInputComponent.
 * @see https://prisme.lucca.io/94310e217/p/717b6d-select-deprecated
 */
@Component({
	selector: 'lu-option-placeholder',
	templateUrl: './option-placeholder.component.html',
	styleUrl: './option-placeholder.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuOptionPlaceholderComponent {
	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	@Output() onClear = new EventEmitter();

	public readonly intl = input(...intlInputOptions(LU_OPTION_PLACEHOLDER_TRANSLATIONS));

	clear() {
		this.onClear.emit();
	}
}
