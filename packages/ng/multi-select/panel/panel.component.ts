import { A11yModule, ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { AsyncPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { SELECT_ID, ɵLuOptionComponent, ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { asyncScheduler, filter, map, observeOn, take, takeUntil } from 'rxjs';
import { LuMultiSelectPanelRef } from '../input/panel.model';
import { ILuMultiSelectPanelData, MULTI_SELECT_PANEL_DATA } from '../select.model';
import { LU_MULTI_SELECT_TRANSLATIONS } from '../select.translate';
import { LuIsOptionSelectedPipe } from './option-selected.pipe';
import { ɵLuMultiSelectSelectedChipDirective } from './selected-chip.directive';

@Component({
	selector: 'lu-select-panel',
	templateUrl: './panel.component.html',
	styleUrls: ['./panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [A11yModule, AsyncPipe, FormsModule, LuIsOptionSelectedPipe, NgIf, NgFor, ɵLuOptionComponent, ɵLuOptionOutletDirective, ɵLuMultiSelectSelectedChipDirective, NgTemplateOutlet],
})
export class LuMultiSelectPanelComponent<T> implements AfterViewInit {
	protected panelData = inject<ILuMultiSelectPanelData<T>>(MULTI_SELECT_PANEL_DATA);
	panelRef = inject<LuMultiSelectPanelRef<T>>(LuMultiSelectPanelRef);
	selectId = inject(SELECT_ID);
	intl = getIntl(LU_MULTI_SELECT_TRANSLATIONS);
	isExpanded = this.panelData.expanded;

	options$ = this.panelData.options$;
	loading$ = this.panelData.loading$;
	areAllOptionsSelected$ = this.panelData.areAllOptionsSelected$;
	canSelectAll = false; // TODO connect to panel options when we'll be ok on designing select all
	optionComparer = this.panelData.optionComparer;
	selectedOptions: T[] = this.panelData.initialValue || [];
	optionTpl = this.panelData.optionTpl;
	searchable = this.panelData.searchable;

	@ViewChild('searchInput')
	searchInput: ElementRef<HTMLInputElement> | undefined;

	@ViewChildren(ɵLuOptionComponent) optionsQL: QueryList<ɵLuOptionComponent<T>>;
	private leftColumnKeyManager: ActiveDescendantKeyManager<ɵLuOptionComponent<T>>;

	@ViewChildren(ɵLuMultiSelectSelectedChipDirective) selectedChipsQL: QueryList<ɵLuMultiSelectSelectedChipDirective<T>>;
	private rightColumnKeyManager: ActiveDescendantKeyManager<ɵLuMultiSelectSelectedChipDirective<T>>;

	search: string | null = null;

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

		this.initLeftColumnKeyManager();
		this.initRightColumnKeyManager();

		if (this.searchInput) {
			setTimeout(() => this.searchInput.nativeElement.focus());
		}

		if (this.isExpanded) {
			this.panelRef.useExpandedPosition();
		} else {
			this.panelRef.useDefaultPosition();
		}
	}

	@HostListener('keydown', ['$event'])
	onKeyDown($event: KeyboardEvent): void {
		if ($event.key === 'Escape') {
			return this.panelRef.close();
		}
	}

	onLeftColumnKeydown($event: KeyboardEvent): void {
		if ($event.code === 'Space' || $event.code === 'Enter') {
			this.toggleOption(this.leftColumnKeyManager?.activeItem?.option);
			$event.preventDefault();
			return;
		}

		this.leftColumnKeyManager?.onKeydown($event);
	}

	onRightColumnKeydown($event: KeyboardEvent): void {
		const option = this.rightColumnKeyManager?.activeItem?.option;

		if (option && ($event.code === 'Space' || $event.code === 'Enter')) {
			this.onChipKillClick(option);
			$event.preventDefault();
			return;
		}

		this.rightColumnKeyManager?.onKeydown($event);
	}

	// toggleAll(shouldSelectAll: boolean): void {
	// 	if (shouldSelectAll) {
	// 		this.panelRef.selectAll.emit();
	// 	} else {
	// 		this.clear();
	// 	}
	// }

	updateClue(clue: string | null): void {
		this.search = clue;
		this.panelRef.clueChanged.emit(clue);

		setTimeout(() => this.leftColumnKeyManager.setFirstItemActive());
	}

	toggleOption(option: T): void {
		const selectedOption = this.selectedOptions.find((o) => this.optionComparer(o, option));
		this.selectedOptions = selectedOption ? this.selectedOptions.filter((o) => o !== selectedOption) : [...this.selectedOptions, option];
		this.panelRef.emitValue(this.selectedOptions);
		this.leftColumnKeyManager?.setActiveItem(this.optionsQL.toArray().findIndex((o) => o.option === option));
	}

	onChipKillClick(option: T): void {
		const optionToUnselectIndex = this.selectedOptions.findIndex((o) => this.optionComparer(o, option));
		this.selectedOptions = this.selectedOptions.filter((_, index) => index !== optionToUnselectIndex);
		this.panelRef.emitValue(this.selectedOptions);

		if (this.selectedOptions.length && this.rightColumnKeyManager) {
			optionToUnselectIndex >= this.selectedOptions.length ? this.rightColumnKeyManager.setPreviousItemActive() : this.rightColumnKeyManager.setNextItemActive();
		}
	}

	clear(): void {
		this.selectedOptions = [];
		this.panelRef.emitValue(this.selectedOptions);
	}

	protected initLeftColumnKeyManager(): void {
		this.leftColumnKeyManager = new ActiveDescendantKeyManager(this.optionsQL).withHomeAndEnd();

		if (this.selectedOptions) {
			this.options$
				?.pipe(
					observeOn(asyncScheduler),
					map((options) => (this.selectedOptions.length ? options.findIndex((o) => this.optionComparer(o, this.selectedOptions[0])) : -1)),
					filter((index) => index !== -1),
					take(1),
					takeUntil(this.panelRef.closed),
				)
				.subscribe((selectedIndex) => this.leftColumnKeyManager.setActiveItem(selectedIndex));
		}

		this.leftColumnKeyManager.change
			.pipe(
				map(() => this.leftColumnKeyManager.activeItem?.id),
				takeUntil(this.panelRef.closed),
			)
			.subscribe((activeDescendant) => this.panelRef.activeOptionIdChanged.emit(activeDescendant));
	}

	protected initRightColumnKeyManager(): void {
		this.rightColumnKeyManager = new ActiveDescendantKeyManager(this.selectedChipsQL).withHomeAndEnd();
	}
}
