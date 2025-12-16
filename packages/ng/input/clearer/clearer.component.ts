import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Output } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { ALuClearer, ILuClearer } from './clearer.model';
import { LU_CLEARER_TRANSLATIONS } from './clearer.translate';

/**
 * @deprecated use `ClearComponent` instead
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
	intl = getIntl(LU_CLEARER_TRANSLATIONS);

	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	@Output() override onClear = new EventEmitter<T>();
	onClick($event: Event) {
		this.onClear.emit();
		$event.preventDefault();
		$event.stopPropagation();
	}
}
