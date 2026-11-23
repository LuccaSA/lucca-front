import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal, TemplateRef, Type, viewChild, viewChildren, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { luBooleanAttribute } from '@lucca-front/ng/core';
import {
	ALuSelectInputComponent,
	CoreSelectKeyManager,
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
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		// WebKit only exposes a tree whose descendants, down to each treeitem, are treeitems, groups
		// or presentational: one host without a role and VoiceOver reads every row as a mere group.
		role: 'presentation',
	},
})
export class TreeBranchComponent<T> {
	readonly selectInputComponent = inject(ALuSelectInputComponent);

	readonly rootOptionRef = viewChild<ɵCoreSelectPanelElement<T>>('rootOption');

	private readonly childBranches = viewChildren(TreeBranchComponent);

	readonly #parentBranch = inject<TreeBranchComponent<T>>(TreeBranchComponent, { skipSelf: true, optional: true });

	readonly #keyManager = inject<CoreSelectKeyManager<T>>(CoreSelectKeyManager, { optional: true });

	/** Position of this row among its siblings, from 1. Exposed as `aria-posinset`. */
	readonly treeitemPosition = input<number | null>(null);

	/** Number of siblings this row has, itself included. Exposed as `aria-setsize`. */
	readonly treeitemSetSize = input<number | null>(null);

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

	/**
	 * The rule this branch stands for and the rows it covers trade places in the selection: either
	 * the rule comes in and absorbs them, or it leaves and they take its place.
	 */
	parentSelectionSwapped = output<{ select: T[]; unselect: T[] }>();

	readonly simpleMode = input(false, { transform: luBooleanAttribute });

	/**
	 * Selecting this branch stands for everything it holds, so only the branch itself is emitted.
	 * Without it, selecting a branch selects every descendant too.
	 */
	readonly parentStandsForChildren = input(false, { transform: luBooleanAttribute });

	/** Folds this branch’s children behind a chevron, and every branch below it. */
	readonly collapsable = input(false, { transform: luBooleanAttribute });

	/** Set when an ancestor branch keeps this one folded, so its row is hidden. */
	readonly hiddenByCollapse = input(false, { transform: luBooleanAttribute });

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

	readonly childrenHiddenByCollapse = computed(() => this.hiddenByCollapse() || (this.collapsable() && !this.isExpanded()));

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

		this.selectInputComponent.expandOption$?.pipe(takeUntilDestroyed()).subscribe(() => this.#onArrowRight());
		this.selectInputComponent.collapseOption$?.pipe(takeUntilDestroyed()).subscribe(() => this.#onArrowLeft());
	}

	/** The chevron asks; the generator decides and hands the answer back through `branch().expanded`. */
	protected reportExpanded(expanded: boolean): void {
		this.#expandedLocally.set(expanded);
		this.selectInputComponent.optionExpandedChange$.next({ option: this.branch().node, expanded });
	}

	/** Tree pattern: unfolds a folded row, or moves to the first child of an unfolded one. */
	#onArrowRight(): void {
		if (!this.collapsable() || !this.rootOptionRef()?.isHighlighted()) {
			return;
		}
		if (!this.#canFold()) {
			return;
		}
		if (!this.isExpanded()) {
			this.reportExpanded(true);
			return;
		}
		this.#highlight(this.childBranches()[0]?.rootOptionRef());
	}

	/** Tree pattern: folds an unfolded row, or moves from a row to its parent. */
	#onArrowLeft(): void {
		if (!this.collapsable() || !this.rootOptionRef()?.isHighlighted()) {
			return;
		}
		if (this.#canFold() && this.isExpanded()) {
			this.reportExpanded(false);
			return;
		}
		this.#highlight(this.#parentBranch?.rootOptionRef());
	}

	#canFold(): boolean {
		return this.branch().expandable ?? (this.branch().children?.length ?? 0) > 0;
	}

	/**
	 * Every branch hears the same key press, one after the other. Moving the highlight right away
	 * would let the branch it lands on act on that same press too, so the move waits for them all.
	 */
	#highlight(target: ɵCoreSelectPanelElement<T> | undefined): void {
		if (target) {
			queueMicrotask(() => this.#keyManager?.setActiveItemByElement(target));
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
		if (this.parentStandsForChildren() && this.#absorbCoveredRows(branchData)) {
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
	/**
	 * Selecting a rule takes in what it covers: the rows picked one by one underneath it are
	 * redundant once it applies, so they leave the selection as it enters. Reaches the rows this
	 * branch holds, which is every row the user could have picked — one only shows up once loaded.
	 */
	#absorbCoveredRows(branchData: TreeNode<T>): boolean {
		if (this.#isSelectedInOwnRight()) {
			return false;
		}
		const selectedOptions = this.selectedOptions();
		const optionComparer = this.optionComparer();
		const covered = this.flattenTree(branchData, true).filter((option) => this.#selectionStrategy.isSelected(option, selectedOptions, optionComparer));
		if (!covered.length) {
			return false;
		}
		this.parentSelectionSwapped.emit({ select: [branchData.node], unselect: covered });
		return true;
	}

	protected onCoveredUnselect(node: T): void {
		if (!this.#isSelectedInOwnRight()) {
			this.coveredUnselect.emit(node);
			return;
		}
		const optionComparer = this.optionComparer();
		this.parentSelectionSwapped.emit({
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
