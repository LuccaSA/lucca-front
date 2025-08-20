import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input, output, TemplateRef, Type, viewChild, ViewEncapsulation } from '@angular/core';
import { ALuSelectInputComponent, LuIsOptionSelectedPipe, LuOptionComparer, LuOptionContext, TreeNode, ɵCoreSelectPanelElement, ɵLuOptionComponent } from '@lucca-front/ng/core-select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'lu-tree-branch',
	imports: [ɵCoreSelectPanelElement, LuIsOptionSelectedPipe, ɵLuOptionComponent],
	templateUrl: './tree-branch.component.html',
	styleUrl: './tree-branch.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeBranchComponent<T> {
	selectInputComponent = inject(ALuSelectInputComponent);

	rootOptionRef = viewChild<ɵCoreSelectPanelElement<T>>('rootOption');

	branch = input.required<TreeNode<T>>();

	optionTpl = input.required<TemplateRef<LuOptionContext<T>> | Type<unknown> | undefined>();

	optionIndex = input.required({ transform: (value: string | number) => `${value}` });

	optionComparer = input.required<LuOptionComparer<T>>();

	selectedOptions = input<T[]>([]);

	toggleOne = output<T>();

	selectMany = output<T[]>();

	unselectMany = output<T[]>();

	simpleMode = input(false, { transform: booleanAttribute });

	constructor() {
		if (this.selectInputComponent.selectChildren$) {
			this.selectInputComponent.selectChildren$.pipe(takeUntilDestroyed()).subscribe(() => {
				if (this.rootOptionRef().isHighlighted()) {
					this.selectOnlyChildren(this.branch());
				}
			});
			this.selectInputComponent.selectParent$.pipe(takeUntilDestroyed()).subscribe(() => {
				if (this.rootOptionRef().isHighlighted()) {
					this.toggleOne.emit(this.branch().node);
				}
			});
		}
	}

	toggle(branchData: TreeNode<T>): void {
		if (this.simpleMode() || branchData.children.length === 0) {
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
		if (branch.children.length > 0) {
			result.push(...branch.children.map((child) => this.flattenTree(child)).flat());
		}
		return result;
	}
}
