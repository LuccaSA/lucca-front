import { A11yModule } from '@angular/cdk/a11y';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, computed, forwardRef, inject, signal, TrackByFunction } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getIntl, PortalDirective } from '@lucca-front/ng/core';
import {
	CoreSelectKeyManager,
	CoreSelectPanelInstance,
	LuOptionGroup,
	LuSelectPanelRef,
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
	imports: [
		A11yModule,
		AsyncPipe,
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
	public intl = getIntl(LU_SIMPLE_SELECT_TRANSLATIONS);

	options$ = this.selectInput.options$;
	grouping = this.selectInput.grouping;
	treeGenerator = this.selectInput.treeGenerator;
	loading$ = this.selectInput.loading$;
	searchable = this.selectInput.searchable;
	emptyMessage = computed(() => this.selectInput.emptyMessage());
	optionComparer = this.selectInput.optionComparer;
	optionKey = this.selectInput.optionKey;

	trackOptionsBy: TrackByFunction<T> = (_, option) => this.optionKey(option);
	trackGroupsBy: TrackByFunction<LuOptionGroup<T, unknown>> = (_, group) => group.key;
	trackBranchesBy: TrackByFunction<TreeNode<T>> = (_, option) => this.optionKey(option.node);

	initialValue: T | undefined = this.selectInput.value;
	optionTpl = this.selectInput.optionTpl;

	options = signal<ɵCoreSelectPanelElement<T>[]>([]);

	public keyManager = inject<CoreSelectKeyManager<T>>(CoreSelectKeyManager);

	public selected = computed(() => this.selectInput.valueSignal());

	public clueChange$ = this.selectInput.clue$;
	public shouldDisplayAddOption$ = this.selectInput.shouldDisplayAddOption$;
	public groupTemplateLocation$ = ɵgetGroupTemplateLocation(!!this.grouping, this.clueChange$, this.options$, this.searchable);

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
		this.keyManager.init({
			queryList: this.options,
			options$: this.options$,
			optionComparer: this.optionComparer,
			activeOptionIdChanged$: this.panelRef.activeOptionIdChanged,
			clueChange$: this.selectInput.searchable ? this.selectInput.clueChange : EMPTY,
		});

		if (this.initialValue && !this.selectInput.clue) {
			this.keyManager.highlightOption(this.initialValue);
		}
	}
}
