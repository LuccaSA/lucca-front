import { A11yModule, ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, Pipe, PipeTransform, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { LuSelectPanelRef, SELECT_ID, ɵLuOptionComponent, ɵLuOptionOutletDirective } from '@lucca-front/ng/core-select';
import { asyncScheduler, filter, map, observeOn, take, takeUntil } from 'rxjs';
import { ILuMultiSelectPanelData, MULTI_SELECT_PANEL_DATA } from '../select.model';
import { LU_MULTI_SELECT_TRANSLATIONS } from '../select.translate';

@Pipe({
	name: 'luIsOptionSelected',
	standalone: true,
})
class LuIsOptionSelectedPipe implements PipeTransform {
	transform<T>(option: T, comparer: (option1: T, option2: T) => boolean, selectedOptions: T[]): boolean {
		return selectedOptions.some((selectedOption) => comparer(option, selectedOption));
	}
}

@Component({
	selector: 'lu-select-panel',
	templateUrl: './panel.component.html',
	styleUrls: ['./panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [A11yModule, AsyncPipe, FormsModule, LuIsOptionSelectedPipe, NgIf, NgFor, ɵLuOptionComponent, ɵLuOptionOutletDirective],
})
export class LuMultiSelectPanelComponent<T> implements AfterViewInit {
	protected panelData = inject<ILuMultiSelectPanelData<T>>(MULTI_SELECT_PANEL_DATA);
	panelRef = inject<LuSelectPanelRef<T, T[]>>(LuSelectPanelRef);
	selectId = inject(SELECT_ID);
	intl = getIntl(LU_MULTI_SELECT_TRANSLATIONS);
	isExpanded = false;

	options$ = this.panelData.options$;
	loading$ = this.panelData.loading$;
	optionComparer = this.panelData.optionComparer;
	selectedOptions: T[] = this.panelData.initialValue || [];
	optionTpl = this.panelData.optionTpl;
	searchable = this.panelData.searchable;

	@ViewChild('searchInput')
	set searchInput(input: ElementRef<HTMLInputElement> | undefined) {
		if (!input) {
			return;
		}

		setTimeout(() => input.nativeElement.focus());
	}

	@ViewChildren(ɵLuOptionComponent) optionsQL: QueryList<ɵLuOptionComponent<T>>;
	private keyManager: ActiveDescendantKeyManager<ɵLuOptionComponent<T>>;

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

		this.keyManager = new ActiveDescendantKeyManager(this.optionsQL).withHomeAndEnd();

		if (this.selectedOptions) {
			this.options$
				?.pipe(
					observeOn(asyncScheduler),
					map((options) => (this.selectedOptions.length ? options.findIndex((o) => this.optionComparer(o, this.selectedOptions[0])) : -1)),
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
				return this.toggleOption(this.keyManager?.activeItem?.option);
			default:
				this.keyManager?.onKeydown($event);
		}
	}

	updateClue(clue: string | null): void {
		this.search = clue;
		this.panelRef.clueChanged.emit(clue);

		setTimeout(() => this.keyManager.setFirstItemActive());
	}

	toggleOption(option: T): void {
		const selectedOption = this.selectedOptions.find((o) => this.optionComparer(o, option));
		this.selectedOptions = selectedOption ? this.selectedOptions.filter((o) => o !== selectedOption) : [...this.selectedOptions, option];
		this.panelRef.emitValue(this.selectedOptions);
		this.keyManager?.setActiveItem(this.optionsQL.toArray().findIndex((o) => o.option === option));
	}

	clear(): void {
		this.selectedOptions = [];
		this.panelRef.emitValue(this.selectedOptions);
	}
}
