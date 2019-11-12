import {
	ChangeDetectionStrategy,
	Component,
	Output,
	forwardRef,
	EventEmitter,
} from '@angular/core';
import { ALuClearer, ILuClearer } from '@lucca-front/ng/input';

/**
* Displays user'picture or a placeholder with his/her initials and random bg color'
*/
@Component({
	selector: 'lu-select-clearer',
	templateUrl: './select-clearer.component.html',
	styleUrls: ['./select-clearer.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	exportAs: 'luClearer',
	providers: [
		{
			provide: ALuClearer,
			useExisting: forwardRef(() => LuSelectClearerComponent),
		},
	]
})
export class LuSelectClearerComponent<T = any> extends ALuClearer<T>implements ILuClearer<T> {
	@Output() onClear = new EventEmitter<T>();
	onClick($event: Event) {
		this.onClear.emit(undefined);
		$event.stopPropagation();
	}
}
