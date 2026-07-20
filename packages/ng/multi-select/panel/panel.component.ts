import { A11yModule } from '@angular/cdk/a11y';
import { NgTemplateOutlet } from '@angular/common';
import { afterNextRender, AfterViewInit, ChangeDetectionStrategy, Component, computed, forwardRef, inject, Injector, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { isNotNil, PortalDirective } from '@lucca-front/ng/core';
import {
	CoreSelectKeyManager,
	CoreSelectPanelInstance,
	LuIsOptionSelectedPipe,
	SELECT_ID,
	SELECT_PANEL_INSTANCE,
	TreeDisplayPipe,
	ɵCoreSelectPanelElement,
	ɵgetGroupTemplateLocation,
	ɵLuOptionComponent,
	ɵLuOptionGroupPipe,
} from '@lucca-front/ng/core-select';
import { ListboxComponent, ListboxState, OptionComponent as ListboxOptionComponent } from '@lucca-front/ng/listbox';
import { TreeBranchComponent } from '@lucca-front/ng/tree-select';
import { EMPTY, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { LuMultiSelectInputComponent } from '../input';
import { LuMultiSelectPanelRef } from '../input/panel.model';
import { MULTI_SELECT_INPUT } from '../select.model';
import { LuOptionsGroupContextPipe } from './option-group-context.pipe';

@Component({
	selector: 'lu-select-panel',
	templateUrl: './panel.component.html',
	styleUrl: './panel.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'(document:keydown)': 'onKeydown()',
		'(document:mousemove)': 'onMousemove()',
	},
	imports: [
		A11yModule,
		FormsModule,
		LuIsOptionSelectedPipe,
		ɵLuOptionComponent,
		ɵLuOptionGroupPipe,
		NgTemplateOutlet,
		PortalDirective,
		LuOptionsGroupContextPipe,
		ɵCoreSelectPanelElement,
		ListboxComponent,
		ListboxOptionComponent,
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
	protected readonly selectInput = inject<LuMultiSelectInputComponent<T>>(MULTI_SELECT_INPUT);
	readonly panelRef = inject<LuMultiSelectPanelRef<T>>(LuMultiSelectPanelRef);
	readonly selectId = inject(SELECT_ID);

	readonly dataSourceOptions = this.selectInput.dataSourceOptions;
	readonly grouping = this.selectInput.groupingSignal;
	treeGenerator = this.selectInput.treeGenerator;
	readonly loading = this.selectInput.loading;
	searchable = this.selectInput.searchable;
	readonly optionComparer = this.selectInput.optionComparer;
	readonly optionKey = this.selectInput.optionKey;
	intl = this.selectInput.intl;

	selectedOptions: T[] = this.selectInput.value || [];
	readonly optionTpl = this.selectInput.optionTpl;

	readonly options = signal<ɵCoreSelectPanelElement<T>[]>([]);
	readonly pointerNavigation = signal(false);

	readonly keyManager = inject<CoreSelectKeyManager<T>>(CoreSelectKeyManager);
	readonly #injector = inject(Injector);

	onKeydown(): void {
		this.pointerNavigation.set(false);
	}

	onMousemove(): void {
		this.pointerNavigation.set(true);
	}

	readonly someGroupOptionEnabled = computed(() => {
		return (groupOptions: T[]) => {
			const disabledOptionIds = this.options()
				.filter((o) => o.disabled)
				.map((o) => o.option())
				.filter(isNotNil)
				.map((option) => this.optionKey()(option));
			return groupOptions.some((option) => !disabledOptionIds.includes(this.optionKey()(option)));
		};
	});

	readonly groupLoadingKeys = signal<Set<unknown>>(new Set());

	readonly hasGrouping = computed(() => !!this.grouping());
	public readonly clue = toSignal(this.selectInput.clue$.pipe(map((clue) => clue ?? '')), { initialValue: '' });
	public readonly shouldDisplayAddOption = this.selectInput.shouldDisplayAddOption;

	readonly groupTemplateLocation = ɵgetGroupTemplateLocation(this.hasGrouping, this.clue, this.searchable);

	// Loading takes precedence over empty so the "no result" message never flashes during a fetch
	readonly listboxState = computed<ListboxState | null>(() => (this.loading() ? 'loading' : this.dataSourceOptions().length === 0 ? 'empty' : null));

	readonly listboxStatusMsg = computed(() => {
		if (this.loading()) {
			return this.intl().loading;
		}
		return this.clue().length ? this.intl().emptyResults : this.intl().emptyOptions;
	});

	onScroll(evt: Event): void {
		if (!(evt.target instanceof HTMLElement)) {
			return;
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
		const matchingOption = this.selectedOptions.find((o) => this.optionComparer()(o, option));
		this.selectedOptions = matchingOption && option ? this.selectedOptions.filter((o) => o !== matchingOption) : [...this.selectedOptions, option];
		this.panelRef.emitValue(this.selectedOptions);
		afterNextRender(() => this.panelRef.updatePosition(), { injector: this.#injector });
	}

	toggleOptions(notSelectedOptions: T[], groupOptions: T[], groupKey?: unknown): void {
		const dataSource = this.selectInput.dataSource();
		if (groupKey !== undefined && dataSource.getGroupOptions) {
			this.groupLoadingKeys.update((keys) => new Set(keys).add(groupKey));
			void firstValueFrom(dataSource.getGroupOptions(groupKey))
				.then((allGroupOptions) => {
					this.groupLoadingKeys.update((keys) => {
						const s = new Set(keys);
						s.delete(groupKey);
						return s;
					});
					const notSelectedOptions = allGroupOptions.filter((o) => !this.selectedOptions.some((so) => this.optionComparer()(so, o)));
					this.#applyGroupToggle(notSelectedOptions, allGroupOptions);
				})
				.catch(() => {
					this.groupLoadingKeys.update((keys) => {
						const s = new Set(keys);
						s.delete(groupKey);
						return s;
					});
				});
			return;
		}
		this.#applyGroupToggle(notSelectedOptions, groupOptions);
	}

	#applyGroupToggle(notSelectedOptions: T[], groupOptions: T[]): void {
		// Filter out disabled options
		const disabledOptionIds = this.options()
			.filter((o) => o.disabled)
			.map((o) => o.option())
			.filter(isNotNil)
			.map((option) => this.optionKey()(option));
		const enabledNotSelectedOptions = notSelectedOptions.filter((o) => !disabledOptionIds.includes(this.optionKey()(o)));
		const enabledGroupOptions = groupOptions.filter((o) => !disabledOptionIds.includes(this.optionKey()(o)));

		if (enabledNotSelectedOptions.length) {
			// If some options are not selected, select them all
			this.selectedOptions = [...this.selectedOptions, ...enabledNotSelectedOptions];
		} else {
			// If all options are already selected, unselect them all
			this.selectedOptions = this.selectedOptions.filter((o) => !enabledGroupOptions.some((so) => this.optionComparer()(so, o)));
		}

		this.panelRef.emitValue(this.selectedOptions);
		afterNextRender(() => this.panelRef.updatePosition(), { injector: this.#injector });
	}

	protected initKeyManager(): void {
		this.keyManager.init({
			queryList: this.options,
			options: this.dataSourceOptions,
			optionComparer: this.optionComparer(),
			activeOptionIdChanged$: this.panelRef.activeOptionIdChanged,
			clueChange$: this.selectInput.searchable ? this.selectInput.clueChange$ : EMPTY,
		});

		if (this.selectedOptions?.length) {
			const firstSelectedOption = this.selectedOptions[0];
			if (firstSelectedOption !== undefined) {
				this.keyManager.highlightOption(firstSelectedOption);
			}
		}
	}
}
