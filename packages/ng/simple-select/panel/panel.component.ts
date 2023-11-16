import { A11yModule, ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { LuSelectPanelRef, SELECT_ID, ɵLuOptionComponent } from '@lucca-front/ng/core-select';
import { asyncScheduler, filter, map, observeOn, take, takeUntil } from 'rxjs';
import { ILuSimpleSelectPanelData, SIMPLE_SELECT_PANEL_DATA } from '../select.model';
import { LU_SIMPLE_SELECT_TRANSLATIONS } from '../select.translate';

@Component({
	selector: 'lu-select-panel',
	templateUrl: './panel.component.html',
	styleUrls: ['./panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [A11yModule, AsyncPipe, FormsModule, NgIf, NgFor, ɵLuOptionComponent],
})
export class LuSelectPanelComponent<T> implements AfterViewInit {
	protected panelData = inject<ILuSimpleSelectPanelData<T>>(SIMPLE_SELECT_PANEL_DATA);
	public panelRef = inject<LuSelectPanelRef<T, T>>(LuSelectPanelRef);
	public selectId = inject(SELECT_ID);
	public intl = getIntl(LU_SIMPLE_SELECT_TRANSLATIONS);

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
	}

	@ViewChildren(ɵLuOptionComponent) optionsQL: QueryList<ɵLuOptionComponent<T>>;
	private keyManager: ActiveDescendantKeyManager<ɵLuOptionComponent<T>>;

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

		if (evt.target.scrollHeight - evt.target.scrollTop - evt.target.clientHeight < 1) {
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
					observeOn(asyncScheduler),
					map((options) => options.findIndex((o) => this.optionComparer(o, this.initialValue))),
					filter((index) => index !== -1),
					take(1),
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

	// updateClue(clue: string | null): void {
	// 	this.search = clue;
	// 	this.panelRef.clueChanged.emit(clue);
	//
	// 	setTimeout(() => this.keyManager.setFirstItemActive());
	// }
}
