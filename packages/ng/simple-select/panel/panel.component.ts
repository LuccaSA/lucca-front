import { A11yModule } from '@angular/cdk/a11y';
import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, computed, forwardRef, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { PortalDirective } from '@lucca-front/ng/core';
import {
    CoreSelectKeyManager,
    CoreSelectPanelInstance,
    LuSelectPanelRef,
    SELECT_ID,
    SELECT_PANEL_INSTANCE,
    TreeDisplayPipe,
    ɵCoreSelectPanelElement,
    ɵgetGroupTemplateLocation,
    ɵLuOptionComponent,
    ɵLuOptionGroupPipe,
} from '@lucca-front/ng/core-select';
import { IconComponent } from '@lucca-front/ng/icon';
import { TreeBranchComponent } from '@lucca-front/ng/tree-select';
import { EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';
import { LuSimpleSelectInputComponent } from '../input/select-input.component';
import { SIMPLE_SELECT_INPUT } from '../select.model';
import { LuIsOptionSelectedPipe } from './option-selected.pipe';

@Component({
	selector: 'lu-select-panel',
	templateUrl: './panel.component.html',
	styleUrl: './panel.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.colorPanel]': 'colorPanel()',
		'(document:keydown)': 'onKeydown()',
		'(document:mousemove)': 'onMousemove()',
	},
	imports: [
		A11yModule,
		FormsModule,
		NgTemplateOutlet,
		ɵLuOptionGroupPipe,
		ɵLuOptionComponent,
		LuIsOptionSelectedPipe,
		PortalDirective,
		ɵCoreSelectPanelElement,
		IconComponent,
		TreeBranchComponent,
		TreeDisplayPipe,
	],
	providers: [
		CoreSelectKeyManager,
		{
			provide: SELECT_PANEL_INSTANCE,
			useExisting: forwardRef(() => LuSelectPanelComponent),
		},
	],
})
export class LuSelectPanelComponent<T> implements AfterViewInit, CoreSelectPanelInstance<T> {
	public selectInput = inject<LuSimpleSelectInputComponent<T>>(SIMPLE_SELECT_INPUT);
	public panelRef = inject<LuSelectPanelRef<T, T>>(LuSelectPanelRef);
	public selectId = inject(SELECT_ID);
	public intl = this.selectInput.intl;

	readonly dataSourceOptions = this.selectInput.dataSourceOptions;
	readonly grouping = this.selectInput.groupingSignal;
	treeGenerator = this.selectInput.treeGenerator;
	readonly loading = this.selectInput.loading;
	searchable = this.selectInput.searchable;
	readonly optionComparer = this.selectInput.optionComparer;
	readonly optionKey = this.selectInput.optionKey;
	colorPanel = this.selectInput.colorPicker;

	initialValue: T | null = this.selectInput.value;
	readonly optionTpl = this.selectInput.optionTpl;

	readonly options = signal<ɵCoreSelectPanelElement<T>[]>([]);
	readonly pointerNavigation = signal(false);

	onKeydown(): void {
		this.pointerNavigation.set(false);
	}

	onMousemove(): void {
		this.pointerNavigation.set(true);
	}

	public readonly keyManager = inject<CoreSelectKeyManager<T>>(CoreSelectKeyManager);

	public readonly selected = computed(() => this.selectInput.valueSignal());

	readonly hasGrouping = computed(() => !!this.grouping());
	public readonly clue = toSignal(this.selectInput.clue$.pipe(map((clue) => clue ?? '')), { initialValue: '' });
	public shouldDisplayAddOption = this.selectInput.shouldDisplayAddOption;
	public groupTemplateLocation = ɵgetGroupTemplateLocation(this.hasGrouping, this.clue, this.searchable);

	onScroll(evt: Event): void {
		if (!(evt.target instanceof HTMLElement)) {
			return;
		}

		if (evt.target.scrollHeight - evt.target.scrollTop - evt.target.clientHeight < 1) {
			this.panelRef.nextPage.emit();
		}
	}

	ngAfterViewInit(): void {
		this.keyManager.init({
			queryList: this.options,
			options: this.dataSourceOptions,
			optionComparer: this.optionComparer(),
			activeOptionIdChanged$: this.panelRef.activeOptionIdChanged,
			clueChange$: this.selectInput.searchable ? this.selectInput.clueChange$ : EMPTY,
		});

		if (this.initialValue !== null && !this.selectInput.clue) {
			this.keyManager.highlightOption(this.initialValue);
		}
	}
}
