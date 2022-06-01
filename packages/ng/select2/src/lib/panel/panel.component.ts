import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export abstract class LuSelectPanelRef<T> {
	closed = new EventEmitter<void>();
	valueChanged = new EventEmitter<T>();
	clueChanged = new EventEmitter<string>();
	options$: Observable<T>;

	abstract emitValue(value: T): void;
	abstract close(): void;
}

@Component({
	selector: 'lu-select-panel',
	templateUrl: './panel.component.html',
	styleUrls: ['./panel.component.scss'],
})
export class LuSelectPanelComponent<T> implements AfterViewInit {
	@Input() selected?: T;
	@Input() options$?: Observable<T[]>;
	@Input() optionTpl?: TemplateRef<{ $implicit: T }>;
	@Input() searchable = false;

	focusedOption?: T;
	search: string | null = null;

	constructor(private elementRef: ElementRef<HTMLElement>, public panelRef: LuSelectPanelRef<T>) {}

	ngAfterViewInit(): void {
		this.elementRef.nativeElement.focus();
	}

	@HostListener('keydown.escape')
	close(): void {
		this.panelRef.close();
	}

	updateClue(clue: string | null): void {
		this.search = clue;
		this.panelRef.clueChanged.emit(clue);
	}
}
