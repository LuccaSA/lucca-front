import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation, Output } from '@angular/core';
import { EventEmitter } from 'protractor';
@Component({
	selector: 'lu-option',
	templateUrl: './option.component.html',
	styleUrls: ['./option.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	// encapsulation: ViewEncapsulation.None,
})
export class LuOptionComponent<T = any> {
	value: T;
	@Output() onSelect = new EventEmitter();
}
