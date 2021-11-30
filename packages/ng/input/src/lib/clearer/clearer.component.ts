import {
	ChangeDetectionStrategy,
	Component,
	Output,
	forwardRef,
	EventEmitter,
} from '@angular/core';
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
	]
})
export class LuInputClearerComponent<T = any> extends ALuClearer<T> implements ILuClearer<T> {
	@Output() override onClear = new EventEmitter<T>();
	onClick($event: Event) {
		this.onClear.emit(undefined);
		$event.stopPropagation();
	}
}
