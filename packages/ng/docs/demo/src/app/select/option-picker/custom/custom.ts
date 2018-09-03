import {
	ChangeDetectionStrategy,
	Component,
	forwardRef,
	EventEmitter,
	Input,
	Output,
	HostListener,
	ViewContainerRef
} from '@angular/core';
import { ALuOptionItem, ILuOptionItem } from '@lucca-front/ng';

@Component({
	selector: 'custom',
	templateUrl: './custom.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
	],
})
export class CustomComponent {
	red =	{ id: 1, name: 'red' };
	green = { id: 2, name: 'green' };
	yellow =	{ id: 3, name: 'yellow' };
	blue =	{ id: 4, name: 'blue' };
	item = this.red;
}
@Component({
	selector: 'color-option',
	styleUrls: ['./custom.scss'],
	template: `<span [style.color]="value.name">{{value.name}}</span>`,
	providers: [
		{
			provide: ALuOptionItem,
			useExisting: forwardRef(() => ColorOption),
			multi: true,
		},
	],
})
export class ColorOption<T = any> extends ALuOptionItem<T> implements ILuOptionItem<T> {
	@Input() value: T;
	@Output() onSelect = new EventEmitter<T>();
	@HostListener('click')
	onclick() {
		this.onSelect.emit(this.value);
	}
	constructor(protected _vcr: ViewContainerRef) {
		super();
	}
}
