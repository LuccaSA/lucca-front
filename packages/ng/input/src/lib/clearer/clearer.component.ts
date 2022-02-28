import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Output } from '@angular/core';
import { ALuClearer, ILuClearer } from './clearer.model';

@Component({
	selector: 'lu-input-clearer',
	templateUrl: './clearer.component.html',
	styleUrls: ['./clearer.component.scss'],
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
	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	@Output() override onClear = new EventEmitter<T>();
	onClick($event: Event) {
		this.onClear.emit();
		$event.stopPropagation();
	}
}
