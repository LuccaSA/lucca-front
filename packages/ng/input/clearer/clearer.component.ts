import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, input, Output } from '@angular/core';
import { intlInputOptions } from '@lucca-front/ng/core';
import { ALuClearer, ILuClearer } from './clearer.model';
import { LU_CLEARER_TRANSLATIONS } from './clearer.translate';

/**
 * @deprecated since 21.0.0; use ClearComponent.
 * @see https://prisme.lucca.io/94310e217/p/717b6d-select-deprecated
 */
@Component({
	selector: 'lu-input-clearer',
	templateUrl: './clearer.component.html',
	styleUrl: './clearer.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	exportAs: 'luClearer',
	providers: [
		{
			provide: ALuClearer,
			useExisting: forwardRef(() => LuInputClearerComponent),
		},
	],
})
export class LuInputClearerComponent<T> extends ALuClearer<T> implements ILuClearer<T> {
	readonly intl = input(...intlInputOptions(LU_CLEARER_TRANSLATIONS));

	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	@Output() override onClear = new EventEmitter<T>();
	onClick($event: Event) {
		this.onClear.emit();
		$event.preventDefault();
		$event.stopPropagation();
	}
}
