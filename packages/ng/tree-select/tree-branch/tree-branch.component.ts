import { booleanAttribute, ChangeDetectionStrategy, Component, input, output, TemplateRef, Type, ViewEncapsulation } from '@angular/core';
import { LuIsOptionSelectedPipe, LuOptionComparer, LuOptionContext, TreeNode, ɵCoreSelectPanelElement, ɵLuOptionComponent } from '@lucca-front/ng/core-select';

@Component({
	selector: 'lu-tree-branch',
	imports: [ɵCoreSelectPanelElement, LuIsOptionSelectedPipe, ɵLuOptionComponent],
	templateUrl: './tree-branch.component.html',
	styleUrl: './tree-branch.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeBranchComponent<T> {
	branch = input.required<TreeNode<T>>();

	optionTpl = input.required<TemplateRef<LuOptionContext<T>> | Type<unknown> | undefined>();

	optionIndex = input.required({ transform: (value: string | number) => `${value}` });

	optionComparer = input.required<LuOptionComparer<T>>();

	selectedOptions = input<T[]>([]);

	toggleOne = output<T>();

	selectMany = output<T[]>();

	unselectMany = output<T[]>();

	simpleMode = input(false, { transform: booleanAttribute });

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

	flattenTree(branch: TreeNode<T>): T[] {
		const result: T[] = [branch.node];
		if (branch.children.length > 0) {
			result.push(...branch.children.map((child) => this.flattenTree(child)).flat());
		}
		return result;
	}
}
