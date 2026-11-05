import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal, TemplateRef, Type, viewChild, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { luBooleanAttribute } from '@lucca-front/ng/core';
import {
	ALuSelectInputComponent,
	LuIsOptionSelectedPipe,
	LuOptionComparer,
	LuOptionContext,
	TreeNode,
	ɵCoreSelectPanelElement,
	ɵIsSelectedStrategy,
	ɵLuOptionComponent,
} from '@lucca-front/ng/core-select';
import { Treeitem } from '@lucca-front/ng/listbox';

@Component({
	selector: 'lu-tree-branch',
	imports: [ɵCoreSelectPanelElement, LuIsOptionSelectedPipe, ɵLuOptionComponent, Treeitem],
	templateUrl: './tree-branch.component.html',
	styleUrl: './tree-branch.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeBranchComponent<T> {
	readonly selectInputComponent = inject(ALuSelectInputComponent);

	readonly rootOptionRef = viewChild<ɵCoreSelectPanelElement<T>>('rootOption');

	readonly branch = input.required<TreeNode<T>>();

	readonly optionTpl = input.required<TemplateRef<LuOptionContext<T>> | Type<unknown> | undefined>();

	readonly optionIndex = input.required({ transform: (value: string | number) => `${value}` });

	readonly optionComparer = input.required<LuOptionComparer<T>>();

	readonly selectedOptions = input<T[]>([]);

	toggleOne = output<T>();

	selectMany = output<T[]>();

	unselectMany = output<T[]>();

	/** A row covered by a rule was unchecked: reported upward until the branch holding that rule. */
	coveredUnselect = output<T>();

	/** The rule this branch stood for is broken: it leaves the selection, its children take its place. */
	parentSelectionBroken = output<{ select: T[]; unselect: T[] }>();

	readonly simpleMode = input(false, { transform: luBooleanAttribute });

	/**
	 * Selecting this branch stands for everything it holds, so only the branch itself is emitted.
	 * Without it, selecting a branch selects every descendant too.
	 */
	readonly parentStandsForChildren = input(false, { transform: luBooleanAttribute });

	/** Folds this branch’s children behind a chevron, and every branch below it. */
	readonly collapsible = input(false, { transform: luBooleanAttribute });

	/** Set when an ancestor branch keeps this one folded, so its row is hidden. */
	readonly hiddenByCollapse = input(false, { transform: luBooleanAttribute });

	/** Accessible name of this branch’s chevron, composed by the tree generator. */
	readonly disclosureLabel = input<string | null>(null);

	/**
	 * Set when an ancestor is selected and stands for what it holds: this row is then covered by
	 * that rule and reads as checked without
	 * being part of the value. Unchecking it breaks the rule apart rather than doing nothing: the
	 * ancestor leaves the selection and the rows it covered enter it, this one excepted.
	 */
	readonly coveredByRule = input(false, { transform: luBooleanAttribute });

	/**
	 * Whether this branch shows its children. A generator that holds the state decides — which is
	 * what makes an unfolded row survive the panel, rebuilt on every opening. One that says nothing
	 * leaves it to the chevron, kept here for as long as the panel lives.
	 */
	readonly isExpanded = computed(() => this.branch().expanded ?? this.#expandedLocally());

	readonly #expandedLocally = signal(false);

	readonly #selectionStrategy = inject<ɵIsSelectedStrategy<T>>(ɵIsSelectedStrategy);

	readonly #isSelectedInOwnRight = computed(() => this.#selectionStrategy.isSelected(this.branch().node, this.selectedOptions(), this.optionComparer()));

	/** Passed to the children: a rule covers them as soon as it is selected, or already covered. */
	readonly childrenCoveredByRule = computed(() => this.parentStandsForChildren() && (this.coveredByRule() || this.#isSelectedInOwnRight()));

	readonly childrenHiddenByCollapse = computed(() => this.hiddenByCollapse() || (this.collapsible() && !this.isExpanded()));

	constructor() {
		if (this.selectInputComponent.selectChildren$) {
			this.selectInputComponent.selectChildren$?.pipe(takeUntilDestroyed()).subscribe(() => {
				if (this.rootOptionRef()?.isHighlighted()) {
					this.selectOnlyChildren(this.branch());
				}
			});
			this.selectInputComponent.selectParent$?.pipe(takeUntilDestroyed()).subscribe(() => {
				if (this.rootOptionRef()?.isHighlighted()) {
					this.toggleOne.emit(this.branch().node);
				}
			});
		}

		this.selectInputComponent.expandOption$?.pipe(takeUntilDestroyed()).subscribe(() => this.#reportIfHighlighted(true));
		this.selectInputComponent.collapseOption$?.pipe(takeUntilDestroyed()).subscribe(() => this.#reportIfHighlighted(false));
	}

	/** The chevron asks; the generator decides and hands the answer back through `branch().expanded`. */
	protected reportExpanded(expanded: boolean): void {
		this.#expandedLocally.set(expanded);
		this.selectInputComponent.optionExpandedChange$.next({ option: this.branch().node, expanded });
	}

	#reportIfHighlighted(expanded: boolean): void {
		if (this.collapsible() && this.rootOptionRef()?.isHighlighted()) {
			this.reportExpanded(expanded);
		}
	}

	toggle(branchData: TreeNode<T>, event?: Event): void {
		// Options are nested inside their parent's host, so a click bubbles up to every ancestor
		// branch. Stop it here so clicking a child never toggles its parent.
		event?.stopPropagation();
		if (this.coveredByRule()) {
			this.coveredUnselect.emit(branchData.node);
			return;
		}
		if (this.simpleMode() || this.parentStandsForChildren() || !branchData.children?.length) {
			this.toggleOne.emit(branchData.node);
		} else {
			const flatOptions = this.flattenTree(branchData);
			const options = flatOptions.filter((option) => !this.selectedOptions().some((so) => this.optionComparer()(so, option)));
			if (options.length > 0) {
				this.selectMany.emit(options);
			} else {
				this.unselectMany.emit(flatOptions);
			}
		}
	}

	/**
	 * A descendant covered by a rule was unchecked. Only the branch actually holding that rule can
	 * break it, since it alone knows what the rule stood for; a branch in between just passes it on.
	 */
	protected onCoveredUnselect(node: T): void {
		if (!this.#isSelectedInOwnRight()) {
			this.coveredUnselect.emit(node);
			return;
		}
		const optionComparer = this.optionComparer();
		this.parentSelectionBroken.emit({
			select: this.flattenTree(this.branch(), true).filter((option) => !optionComparer(option, node)),
			unselect: [this.branch().node],
		});
	}

	selectOnlyChildren(branchData: TreeNode<T>): void {
		const flatOptions = this.flattenTree(branchData, true);
		const options = flatOptions.filter((option) => !this.selectedOptions().some((so) => this.optionComparer()(so, option)));
		if (options.length > 0) {
			this.selectMany.emit(options);
		} else {
			this.unselectMany.emit(flatOptions);
		}
	}

	flattenTree(branch: TreeNode<T>, excludeRoot = false): T[] {
		const result: T[] = excludeRoot ? [] : [branch.node];
		if (branch.children?.length) {
			result.push(...branch.children.map((child) => this.flattenTree(child)).flat());
		}
		return result;
	}
}
