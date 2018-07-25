import { ChangeDetectionStrategy, Component, Output, HostListener, Input, EventEmitter } from '@angular/core';

@Component({
	selector: 'lu-option',
	templateUrl: './option.component.html',
	styleUrls: ['./option.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuOptionComponent<T = any> {
	@Input() value: T;
	@Output() onSelect = new EventEmitter<T>();
	@HostListener('click')
	onclick() {
		this.onSelect.emit(this.value);
	}
}
