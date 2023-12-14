import { A11yModule, ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { AsyncPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, QueryList, ViewChildren, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { SELECT_ID, ɵLuOptionComponent, ɵLuOptionOutletDirective, ɵgenerateGroups } from '@lucca-front/ng/core-select';
import { EMPTY, asyncScheduler, filter, map, observeOn, take, takeUntil } from 'rxjs';
import { skip } from 'rxjs/operators';
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

	options$ = this.panelData.options$;
	groups$ = this.panelData.grouping ? this.panelData.options$.pipe(map((options) => ɵgenerateGroups(options, this.panelData.grouping.selector))) : EMPTY;
	grouping = this.panelData.grouping;
	loading$ = this.panelData.loading$;
	optionComparer = this.panelData.optionComparer;
	selectedOptions: T[] = this.panelData.initialValue || [];
	optionTpl = this.panelData.optionTpl;

	@ViewChildren(ɵLuOptionComponent) optionsQL: QueryList<ɵLuOptionComponent<T>>;
	private _keyManager: ActiveDescendantKeyManager<ɵLuOptionComponent<T>>;

	public get keyManager(): ActiveDescendantKeyManager<ɵLuOptionComponent<T>> {
		return this._keyManager;
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

		this.initKeyManager();
		this.panelRef.useDefaultPosition();
	}

	toggleOption(option: T): void {
		const selectedOption = this.selectedOptions.find((o) => this.optionComparer(o, option));
		this.selectedOptions = selectedOption ? this.selectedOptions.filter((o) => o !== selectedOption) : [...this.selectedOptions, option];
		this.panelRef.emitValue(this.selectedOptions);
		setTimeout(() => this.panelRef.updatePosition());
		this._keyManager?.setActiveItem(this.optionsQL.toArray().findIndex((o) => o.option === option));
	}

	protected initKeyManager(): void {
		this._keyManager = new ActiveDescendantKeyManager(this.optionsQL).withHomeAndEnd();

		if (this.selectedOptions) {
			this.options$
				?.pipe(
					observeOn(asyncScheduler),
					map((options) => (this.selectedOptions.length ? options.findIndex((o) => this.optionComparer(o, this.selectedOptions[0])) : -1)),
					filter((index) => index !== -1),
					take(1),
					takeUntil(this.panelRef.closed),
				)
				.subscribe((selectedIndex) => this._keyManager.setActiveItem(selectedIndex));
		}

		this._keyManager.change
			.pipe(
				map(() => this._keyManager.activeItem?.id),
				takeUntil(this.panelRef.closed),
			)
			.subscribe((activeDescendant) => this.panelRef.activeOptionIdChanged.emit(activeDescendant));

		/**
		 * On new options, we want to select the first element with key manager
		 */
		this.options$
			?.pipe(
				observeOn(asyncScheduler),
				// Skip first so we don't override "select currently active", we only want new options anyways
				skip(1),
				takeUntil(this.panelRef.closed),
			)
			.subscribe(() => this.keyManager.setFirstItemActive());
	}
}
