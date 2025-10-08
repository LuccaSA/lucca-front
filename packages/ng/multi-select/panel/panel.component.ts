import { A11yModule } from '@angular/cdk/a11y';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, computed, forwardRef, inject, signal, TrackByFunction } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getIntl, PortalDirective } from '@lucca-front/ng/core';
import {
	CoreSelectKeyManager,
	CoreSelectPanelInstance,
	LuIsOptionSelectedPipe,
	LuOptionGroup,
	SELECT_ID,
	SELECT_PANEL_INSTANCE,
	TreeDisplayPipe,
	TreeNode,
	ɵCoreSelectPanelElement,
	ɵgetGroupTemplateLocation,
	ɵLuOptionComponent,
	ɵLuOptionGroupPipe,
} from '@lucca-front/ng/core-select';
import { IconComponent } from '@lucca-front/ng/icon';
import { TreeBranchComponent } from '@lucca-front/ng/tree-select';
import { EMPTY } from 'rxjs';
import { LuMultiSelectInputComponent } from '../input';
import { LuMultiSelectPanelRef } from '../input/panel.model';
import { MULTI_SELECT_INPUT } from '../select.model';
import { LU_MULTI_SELECT_TRANSLATIONS } from '../select.translate';
import { LuOptionsGroupContextPipe } from './option-group-context.pipe';

@Component({
	selector: 'lu-select-panel',
	templateUrl: './panel.component.html',
	styleUrl: './panel.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		A11yModule,
		AsyncPipe,
		FormsModule,
		LuIsOptionSelectedPipe,
		ɵLuOptionComponent,
		ɵLuOptionGroupPipe,
		NgTemplateOutlet,
		PortalDirective,
		LuOptionsGroupContextPipe,
		ɵCoreSelectPanelElement,
		IconComponent,
		TreeDisplayPipe,
		TreeBranchComponent,
	],
	providers: [
		CoreSelectKeyManager,
		{
			provide: SELECT_PANEL_INSTANCE,
			useExisting: forwardRef(() => LuMultiSelectPanelComponent),
		},
	],
})
export class LuMultiSelectPanelComponent<T> implements AfterViewInit, CoreSelectPanelInstance {
	protected selectInput = inject<LuMultiSelectInputComponent<T>>(MULTI_SELECT_INPUT);
	panelRef = inject<LuMultiSelectPanelRef<T>>(LuMultiSelectPanelRef);
	selectId = inject(SELECT_ID);
	intl = getIntl(LU_MULTI_SELECT_TRANSLATIONS);

	options$ = this.selectInput.options$;
	grouping = this.selectInput.grouping;
	treeGenerator = this.selectInput.treeGenerator;
	loading$ = this.selectInput.loading$;
	searchable = this.selectInput.searchable;
	optionComparer = this.selectInput.optionComparer;
	optionKey = this.selectInput.optionKey;

	trackOptionsBy: TrackByFunction<T> = (_, option) => this.optionKey(option);
	trackGroupsBy: TrackByFunction<LuOptionGroup<T, unknown>> = (_, group) => group.key;
	trackBranchesBy: TrackByFunction<TreeNode<T>> = (_, option) => this.optionKey(option.node);

	selectedOptions: T[] = this.selectInput.value || [];
	optionTpl = this.selectInput.optionTpl;

	options = signal<ɵCoreSelectPanelElement<T>[]>([]);
	keyManager = inject<CoreSelectKeyManager<T>>(CoreSelectKeyManager);

	someGroupOptionEnabled = computed(() => {
		return (groupOptions: T[]) => {
			const disabledOptionIds = this.options()
				.filter((o) => o.disabled)
				.map((o) => this.optionKey(o.option()));
			return groupOptions.some((option) => !disabledOptionIds.includes(this.optionKey(option)));
		};
	});

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
		if (!this.options()) {
			return;
		}

		this.initKeyManager();
		this.panelRef.useDefaultPosition();
	}

	toggleOption(option: T): void {
		const matchingOption = this.selectedOptions.find((o) => this.optionComparer(o, option));
		this.selectedOptions = matchingOption && option ? this.selectedOptions.filter((o) => o !== matchingOption) : [...this.selectedOptions, option];
		this.panelRef.emitValue(this.selectedOptions);
		setTimeout(() => this.panelRef.updatePosition());
	}

	toggleOptions(notSelectedOptions: T[], groupOptions: T[]): void {
		// Filter out disabled options
		const disabledOptionIds = this.options()
			.filter((o) => o.disabled)
			.map((o) => this.optionKey(o.option()));
		const enabledNotSelectedOptions = notSelectedOptions.filter((o) => !disabledOptionIds.includes(this.optionKey(o)));
		const enabledGroupOptions = groupOptions.filter((o) => !disabledOptionIds.includes(this.optionKey(o)));

		if (enabledNotSelectedOptions.length) {
			// If some options are not selected, select them all
			this.selectedOptions = [...this.selectedOptions, ...enabledNotSelectedOptions];
		} else {
			// If all options are already selected, unselect them all
			this.selectedOptions = this.selectedOptions.filter((o) => !enabledGroupOptions.some((so) => this.optionComparer(so, o)));
		}

		this.panelRef.emitValue(this.selectedOptions);
		setTimeout(() => this.panelRef.updatePosition());
	}

	protected initKeyManager(): void {
		this.keyManager.init({
			queryList: this.options,
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
