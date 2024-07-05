import { A11yModule, ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getIntl, PortalDirective } from '@lucca-front/ng/core';
import { SELECT_ID, ɵgetGroupTemplateLocation, ɵLuOptionComponent, ɵLuOptionGroupPipe, ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { asyncScheduler, filter, map, observeOn, take, takeUntil } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { LuMultiSelectInputComponent } from '../input';
import { LuMultiSelectPanelRef } from '../input/panel.model';
import { MULTI_SELECT_INPUT } from '../select.model';
import { LU_MULTI_SELECT_TRANSLATIONS } from '../select.translate';
import { LuNotSelectedOptionsPipe } from './not-selected.pipe';
import { LuIsOptionSelectedPipe } from './option-selected.pipe';
import { ɵLuMultiSelectSelectedChipDirective } from './selected-chip.directive';

@Component({
	selector: 'lu-select-panel',
	templateUrl: './panel.component.html',
	styleUrls: ['./panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		A11yModule,
		AsyncPipe,
		FormsModule,
		LuIsOptionSelectedPipe,
		ɵLuOptionComponent,
		ɵLuOptionGroupPipe,
		ɵLuOptionOutletDirective,
		ɵLuMultiSelectSelectedChipDirective,
		NgTemplateOutlet,
		PortalDirective,
		LuNotSelectedOptionsPipe,
	],
})
export class LuMultiSelectPanelComponent<T> implements AfterViewInit {
	panelRef = inject<LuMultiSelectPanelRef<T>>(LuMultiSelectPanelRef);
	selectId = inject(SELECT_ID);
	intl = getIntl(LU_MULTI_SELECT_TRANSLATIONS);
	protected selectInput = inject<LuMultiSelectInputComponent<T>>(MULTI_SELECT_INPUT);
	public clueChange$ = this.selectInput.clue$;
	options$ = this.selectInput.options$;
	grouping = this.selectInput.grouping;
	loading$ = this.selectInput.loading$;
	@ViewChildren(ɵLuOptionComponent) optionsQL: QueryList<ɵLuOptionComponent<T>>;
	groupTemplateLocation$ = ɵgetGroupTemplateLocation(!!this.grouping, this.clueChange$, this.options$);
	optionComparer = this.selectInput.optionComparer;
	selectedOptions: T[] = this.selectInput.value || [];
	optionTpl = this.selectInput.optionTpl;
	public shouldDisplayAddOption$ = this.selectInput.shouldDisplayAddOption$;

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
		const matchingOption = this.selectedOptions.find((o) => this.optionComparer(o, option));
		this.selectedOptions = matchingOption ? this.selectedOptions.filter((o) => o !== matchingOption) : [...this.selectedOptions, option];
		this.panelRef.emitValue(this.selectedOptions);
		setTimeout(() => this.panelRef.updatePosition());
		this._keyManager?.setActiveItem(this.optionsQL.toArray().findIndex((o) => o.option === option));
	}

	toggleOptions(notSelectedOptions: T[], groupOptions: T[]): void {
		if (notSelectedOptions.length) {
			// If some options are not selected, select them all
			this.selectedOptions = [...this.selectedOptions, ...notSelectedOptions];
		} else {
			// If all options are already selected, unselect them all
			this.selectedOptions = this.selectedOptions.filter((o) => !groupOptions.some((so) => this.optionComparer(so, o)));
		}

		this.panelRef.emitValue(this.selectedOptions);
		setTimeout(() => this.panelRef.updatePosition());
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
		if (this.selectInput.searchable) {
			this.selectInput.clueChange
				.pipe(
					switchMap(() => this.optionsQL.changes.pipe(take(1))),
					debounceTime(0),
					takeUntil(this.panelRef.closed),
				)
				.subscribe(() => (this.optionsQL.length ? this.keyManager.setFirstItemActive() : this.keyManager.setActiveItem(-1)));
		}

		this.keyManager.setFirstItemActive();
	}
}
