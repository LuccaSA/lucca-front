import { A11yModule, ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { AsyncPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, QueryList, ViewChildren, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PortalDirective, getIntl } from '@lucca-front/ng/core';
import { LuSelectPanelRef, SELECT_ID, ɵLuOptionComponent, ɵgenerateGroups } from '@lucca-front/ng/core-select';
import { EMPTY, asyncScheduler, filter, map, observeOn, take, takeUntil } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { LuSimpleSelectInputComponent } from '../input/select-input.component';
import { SIMPLE_SELECT_INPUT } from '../select.model';
import { LU_SIMPLE_SELECT_TRANSLATIONS } from '../select.translate';
import { LuIsOptionSelectedPipe } from './option-selected.pipe';

@Component({
	selector: 'lu-select-panel',
	templateUrl: './panel.component.html',
	styleUrls: ['./panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [A11yModule, AsyncPipe, FormsModule, NgIf, NgFor, NgTemplateOutlet, ɵLuOptionComponent, LuIsOptionSelectedPipe, PortalDirective],
})
export class LuSelectPanelComponent<T> implements AfterViewInit {
	public selectInput = inject<LuSimpleSelectInputComponent<T>>(SIMPLE_SELECT_INPUT);
	public panelRef = inject<LuSelectPanelRef<T, T>>(LuSelectPanelRef);
	public selectId = inject(SELECT_ID);
	public intl = getIntl(LU_SIMPLE_SELECT_TRANSLATIONS);

	options$ = this.selectInput.options$;
	grouping = this.selectInput.grouping;
	groups$ = this.grouping ? this.options$.pipe(map((options) => ɵgenerateGroups(options, this.grouping.selector))) : EMPTY;
	loading$ = this.selectInput.loading$;
	optionComparer = this.selectInput.optionComparer;
	initialValue: T | undefined = this.selectInput.value;
	optionTpl = this.selectInput.optionTpl;

	@ViewChildren(ɵLuOptionComponent) optionsQL: QueryList<ɵLuOptionComponent<T>>;
	private _keyManager: ActiveDescendantKeyManager<ɵLuOptionComponent<T>>;

	public get keyManager(): ActiveDescendantKeyManager<ɵLuOptionComponent<T>> {
		return this._keyManager;
	}

	public get selected(): T | undefined {
		return this.initialValue;
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

		this._keyManager = new ActiveDescendantKeyManager(this.optionsQL).withHomeAndEnd();

		this.keyManager.change
			.pipe(
				map(() => this.keyManager.activeItem?.id),
				takeUntil(this.panelRef.closed),
			)
			.subscribe((activeDescendant) => this.panelRef.activeOptionIdChanged.emit(activeDescendant));

		if (this.initialValue && !this.selectInput.clue) {
			this.options$
				?.pipe(
					observeOn(asyncScheduler),
					map((options) => options.findIndex((o) => this.optionComparer(o, this.initialValue))),
					filter((index) => index !== -1),
					take(1),
					takeUntil(this.panelRef.closed),
				)
				.subscribe((selectedIndex) => this.keyManager.setActiveItem(selectedIndex));
		} else {
			// If no initial Value, set first as active
			setTimeout(() => this.keyManager.setFirstItemActive());
		}

		/**
		 * On new options after a search, we want to select the first element with key manager
		 */
		if (this.selectInput.searchable) {
			this.selectInput.clueChange
				.pipe(
					switchMap(() => this.optionsQL.changes.pipe(take(1))),
					debounceTime(0),
					takeUntil(this.panelRef.closed),
				)
				.subscribe(() => this.keyManager.setFirstItemActive());
		}
	}
}
