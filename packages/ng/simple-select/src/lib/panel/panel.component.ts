import { A11yModule, ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { asyncScheduler, map, observeOn, take, takeUntil } from 'rxjs';
import { ɵLuOptionComponent } from '../option/index';
import { ILuSelectPanelData, SELECT_ID, SELECT_PANEL_DATA } from '../select.model';
import { LuSelectPanelRef } from './panel.models';

@Component({
	selector: 'lu-select-panel',
	templateUrl: './panel.component.html',
	styleUrls: ['./panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [CommonModule, FormsModule, A11yModule, ɵLuOptionComponent],
})
export class LuSelectPanelComponent<T> implements AfterViewInit {
	protected panelData = inject<ILuSelectPanelData<T>>(SELECT_PANEL_DATA);
	public panelRef = inject<LuSelectPanelRef<T>>(LuSelectPanelRef);
	public selectId = inject(SELECT_ID);

	options$ = this.panelData.options$;
	loading$ = this.panelData.loading$;
	optionComparer = this.panelData.optionComparer;
	initialValue: T | undefined = this.panelData.initialValue;
	optionTpl = this.panelData.optionTpl;
	searchable = this.panelData.searchable;

	@ViewChild('searchInput')
	public set searchInput(input: ElementRef<HTMLInputElement> | undefined) {
		if (!input) {
			return;
		}

		setTimeout(() => input.nativeElement.focus());
	}

	@ViewChildren(ɵLuOptionComponent) optionsQL: QueryList<ɵLuOptionComponent<T>>;
	private keyManager: ActiveDescendantKeyManager<ɵLuOptionComponent<T>>;

	search: string | null = null;

	public get selected(): T | undefined {
		return this.keyManager?.activeItem?.option;
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
