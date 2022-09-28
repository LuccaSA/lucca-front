import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Inject, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { asyncScheduler, map, Observable, observeOn, take, takeUntil } from 'rxjs';
import { LuOptionComponent } from '../option/index';
import { ILuSelectPanelData, SELECT_ID, SELECT_PANEL_DATA } from '../select.model';

export abstract class LuSelectPanelRef<T> {
	closed = new EventEmitter<void>();
	previousPage = new EventEmitter<void>();
	nextPage = new EventEmitter<void>();
	valueChanged = new EventEmitter<T>();
	clueChanged = new EventEmitter<string>();
	activeOptionIdChanged = new EventEmitter<string>();
	options$: Observable<T>;

	abstract emitValue(value: T): void;
	close(): void {
		this.closed.next();
		this.closed.complete();
		this.nextPage.next();
		this.nextPage.complete();
		this.previousPage.next();
		this.previousPage.complete();
		this.valueChanged.complete();
		this.clueChanged.emit(null);
		this.clueChanged.complete();
		this.activeOptionIdChanged.emit(undefined);
		this.activeOptionIdChanged.complete();
	}
}

@Component({
	selector: 'lu-select-panel',
	templateUrl: './panel.component.html',
	styleUrls: ['./panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuSelectPanelComponent<T> implements AfterViewInit {
	options$: Observable<T[]>;
	optionComparer: (option1: T, option2: T) => boolean;
	initialValue?: T;
	optionTpl: TemplateRef<{ $implicit: T }>;
	searchable: boolean;

	@ViewChild('searchInput')
	public set searchInput(input: ElementRef<HTMLInputElement> | undefined) {
		if (!input) {
			return;
		}

		setTimeout(() => input.nativeElement.focus());
	}

	@ViewChildren(LuOptionComponent) optionsQL: QueryList<LuOptionComponent<T>>;
	private keyManager: ActiveDescendantKeyManager<LuOptionComponent<T>>;

	search: string | null = null;

	public get selected(): T | undefined {
		return this.keyManager?.activeItem?.option;
	}

	constructor(public panelRef: LuSelectPanelRef<T>, @Inject(SELECT_ID) public selectId: number, @Inject(SELECT_PANEL_DATA) private data: ILuSelectPanelData<T>) {
		this.options$ = data.options$;
		this.optionComparer = data.optionComparer;
		this.initialValue = data.initialValue;
		this.optionTpl = data.optionTpl;
		this.searchable = data.searchable;
	}

	onScroll(evt: Event): void {
		if (!(evt.target instanceof HTMLElement)) {
			return;
		}

		if (evt.target.scrollTop === 0) {
			this.panelRef.previousPage.emit();
		}

		if (evt.target.scrollHeight === evt.target.scrollTop + evt.target.clientHeight) {
			this.panelRef.nextPage.emit();
		}
	}

	ngAfterViewInit(): void {
		if (!this.optionsQL) {
			return;
		}

		this.keyManager = new ActiveDescendantKeyManager(this.optionsQL).withHomeAndEnd();

		if (this.initialValue) {
			this.options$
				?.pipe(
					take(1),
					observeOn(asyncScheduler),
					map((options) => options.findIndex((o) => this.optionComparer(o, this.initialValue))),
					takeUntil(this.panelRef.closed),
				)
				.subscribe((selectedIndex) => this.keyManager.setActiveItem(selectedIndex));
		}

		this.keyManager.change
			.pipe(
				map(() => this.keyManager.activeItem?.id),
				takeUntil(this.panelRef.closed),
			)
			.subscribe((activeDescendant) => this.panelRef.activeOptionIdChanged.emit(activeDescendant));
	}

	@HostListener('keydown', ['$event'])
	onKeyDown($event: KeyboardEvent): void {
		switch ($event.key) {
			case 'Escape':
			case 'Tab':
				return this.panelRef.close();
			case 'Enter':
				return this.panelRef.emitValue(this.selected);
			default:
				this.keyManager?.onKeydown($event);
		}
	}

	updateClue(clue: string | null): void {
		this.search = clue;
		this.panelRef.clueChanged.emit(clue);

		setTimeout(() => this.keyManager.setFirstItemActive());
	}
}
