import { Component, EventEmitter, Output, Host, HostBinding } from '@angular/core';

@Component({
	selector: 'lu-option-placeholder',
	templateUrl: './option-placeholder.component.html',
	styleUrls: ['./option-placeholder.component.scss']
})
export class LuOptionPlaceholderComponent {
	@HostBinding('class.optionPlaceholder') private _optionPlaceholderClass = true;
	@Output() onClear = new EventEmitter();
	clear() {
		this.onClear.emit();
	}
}
