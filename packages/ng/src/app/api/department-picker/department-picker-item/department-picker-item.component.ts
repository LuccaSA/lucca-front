import { Component, OnInit, Input } from '@angular/core';
import { IDepartmentTree } from './../department-picker.service';
import { NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core/src/view/provider';

@Component({
	selector: 'lu-department-picker-item',
	templateUrl: './department-picker-item.component.html',
	styleUrls: ['./department-picker-item.component.scss']
})
export class LuDepartmentPickerItemComponent implements OnInit {

	@Input()
	public tree: IDepartmentTree;
	@Input()
	public allowMultiple: boolean;

	constructor() { }

	ngOnInit() {
		if (this.allowMultiple == null) {
			this.allowMultiple = true;
		}
	}

	public onChecked(tree: IDepartmentTree, value: boolean = null) {
		tree.node.isSelected = value != null ? value : !tree.node.isSelected;
		tree.children.forEach(item => this.onChecked(item, tree.node.isSelected));
	}

	public onCheckParentOnly() {
		this.tree.node.isSelected = !this.tree.node.isSelected;
		// To uncheck all children when current node is not selected
		// if (this.tree.node.isSelected === true) {
		// 	this.onChecked(this.tree, false);
		// } else {
		// 	this.tree.node.isSelected = !this.tree.node.isSelected;
		// }
	}
}
