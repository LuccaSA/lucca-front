import { A11yModule } from '@angular/cdk/a11y';
import { AsyncPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, QueryList, TrackByFunction, ViewChildren, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PortalDirective, getIntl } from '@lucca-front/ng/core';
import { CoreSelectKeyManager, LuOptionGroup, SELECT_ID, ɵLuOptionComponent, ɵLuOptionGroupPipe, ɵLuOptionOutletDirective, ɵgetGroupTemplateLocation } from '@lucca-front/ng/core-select';
import { EMPTY } from 'rxjs';
import { LuMultiSelectInputComponent } from '../input';
import { LuMultiSelectPanelRef } from '../input/panel.model';
import { MULTI_SELECT_INPUT } from '../select.model';
import { LU_MULTI_SELECT_TRANSLATIONS } from '../select.translate';
import { LuOptionsGroupContextPipe } from './option-group-context.pipe';
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
		NgIf,
		NgFor,
		ɵLuOptionComponent,
		ɵLuOptionGroupPipe,
		ɵLuOptionOutletDirective,
		ɵLuMultiSelectSelectedChipDirective,
		NgTemplateOutlet,
		PortalDirective,
		LuOptionsGroupContextPipe,
	],
	providers: [CoreSelectKeyManager],
})
export class LuMultiSelectPanelComponent<T> implements AfterViewInit {
	protected selectInput = inject<LuMultiSelectInputComponent<T>>(MULTI_SELECT_INPUT);
	panelRef = inject<LuMultiSelectPanelRef<T>>(LuMultiSelectPanelRef);
	selectId = inject(SELECT_ID);
	intl = getIntl(LU_MULTI_SELECT_TRANSLATIONS);

	options$ = this.selectInput.options$;
	grouping = this.selectInput.grouping;
	loading$ = this.selectInput.loading$;
	searchable = this.selectInput.searchable;
	optionComparer = this.selectInput.optionComparer;
	optionKey = this.selectInput.optionKey;

	trackOptionsBy: TrackByFunction<T> = (_, option) => this.optionKey(option);
	trackGroupsBy: TrackByFunction<LuOptionGroup<T, unknown>> = (_, group) => group.key;

	selectedOptions: T[] = this.selectInput.value || [];
	optionTpl = this.selectInput.optionTpl;

	@ViewChildren(ɵLuOptionComponent) optionsQL: QueryList<ɵLuOptionComponent<T>>;
	keyManager = inject<CoreSelectKeyManager<T>>(CoreSelectKeyManager);

	public clueChange$ = this.selectInput.clue$;
	public shouldDisplayAddOption$ = this.selectInput.shouldDisplayAddOption$;

	groupTemplateLocation$ = ɵgetGroupTemplateLocation(!!this.grouping, this.clueChange$, this.options$, this.searchable);

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
		this.keyManager.setActiveItem(this.optionsQL.toArray().findIndex((o) => o.option === option));
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
		this.keyManager.init({
			queryList: this.optionsQL,
			options$: this.options$,
			optionComparer: this.optionComparer,
			activeOptionIdChanged$: this.panelRef.activeOptionIdChanged,
			clueChange$: this.selectInput.searchable ? this.selectInput.clueChange : EMPTY,
		});

		if (this.selectedOptions?.length) {
			this.keyManager.highlightOption(this.selectedOptions[0]);
		}
	}
}
