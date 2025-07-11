import { ChangeDetectionStrategy, Component, input, output, TemplateRef, Type, ViewEncapsulation } from '@angular/core';
import { TreeNode } from '../model';
import { CoreSelectPanelElement } from '../../panel/selectable-item';
import { LuIsOptionSelectedPipe } from '../../../multi-select/panel/option-selected.pipe';
import { LuOptionComponent } from '../../option/option.component';
import { LuOptionComparer, LuOptionContext } from '../../select.model';

@Component({
	selector: 'lu-tree-branch',
	imports: [CoreSelectPanelElement, LuIsOptionSelectedPipe, LuOptionComponent],
	templateUrl: './tree-branch.component.html',
	styleUrl: './tree-branch.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeBranchComponent<T> {
	branch = input.required<TreeNode<T>>();

	optionTpl = input.required<TemplateRef<LuOptionContext<T>> | Type<unknown> | undefined>();

	optionIndex = input.required<number>();

	optionComparer = input.required<LuOptionComparer<T>>();

	selectedOptions = input.required<T[]>();

	toggleOption = output<T>();
}
