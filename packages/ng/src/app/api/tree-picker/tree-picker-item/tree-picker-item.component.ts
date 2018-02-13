import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITree, ITreeNode } from './../tree-picker.class';
import { NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core/src/view/provider';

@Component({
	selector: 'lu-tree-picker-item',
	templateUrl: './tree-picker-item.component.html',
	styleUrls: ['./tree-picker-item.component.scss']
})
export class LuTreePickerItemComponent implements OnInit {

	@Input()
	public tree: ITree;
	@Input()
	public allowMultiple: boolean;

	@Output()
	public nodeChanged: EventEmitter<ITreeNode> = new EventEmitter<ITreeNode>();

	private _nodeUniqueId: string;
	public get nodeUniqueId(): string { return this._nodeUniqueId; }

	constructor() {
		this._nodeUniqueId = this.guid();
	}

	public ngOnInit() {
		if (this.allowMultiple == null) {
			this.allowMultiple = true;
		}
	}

	public onNodeChanged(node: ITreeNode): void {
		// Relay the information
		this.nodeChanged.emit(node);
	}

	private onChecked(tree: ITree, value: boolean = null) {
		tree.node.isSelected = value != null ? value : !tree.node.isSelected;
		this.nodeChanged.emit(tree.node);
		tree.children.forEach(item => this.onChecked(item, this.allowMultiple ? tree.node.isSelected : false));
	}

	public onCheckParentOnly(): void {
		this.tree.node.isSelected = !this.tree.node.isSelected;

		// // Uncheck all children when current node is not selected
		// if (this.tree.node.isSelected === true) {
		// 	this.onChecked(this.tree, false);
		// } else {
		// 	this.tree.node.isSelected = !this.tree.node.isSelected;
		// }
	}

	/**
	 * Generates a GUID.
	 * See: https://stackoverflow.com/a/2117523/2456022
	 * TODO: export this method in a helper
	 */
	private guid(): string {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			/*tslint:disable*/
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
			/*tslint:enable*/
		});
	}
}
