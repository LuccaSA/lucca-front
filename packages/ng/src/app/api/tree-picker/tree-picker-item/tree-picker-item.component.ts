import { Component, Input, Output } from '@angular/core';
import { NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core/src/view/provider';
import { OnInit, OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';

import { ITree, ITreeNode } from './../tree-picker.class';
import { TreePickerMessageService, TreePickerMessage } from './../tree-picker.message.service';
import { LuTreePickerComponent } from './../tree-picker.component';

@Component({
	selector: 'lu-tree-picker-item',
	templateUrl: './tree-picker-item.component.html',
	styleUrls: ['./tree-picker-item.component.scss']
})
export class LuTreePickerItemComponent implements OnInit, OnChanges {

	@Input()
	public tree: ITree;
	@Input()
	public multiple: boolean;
	@Input()
	public messenger: TreePickerMessageService;

	private readonly _nodeUniqueId: string = this.guid();
	/** Unique identifyer for this TreePickerItem */
	public get nodeUniqueId(): string { return this._nodeUniqueId; }

	constructor() { }

	public ngOnInit() {
		if (this.multiple == null) {
			this.multiple = LuTreePickerComponent.DEFAULT_ALLOW_MULTIPLE;
		}
	}

	public ngOnChanges(changes: SimpleChanges) {
		if (changes.hasOwnProperty('messenger') && changes.messenger != null) {
			this.messenger.onNodeChanged().subscribe(modifiedNode => this.onNodeChanged(modifiedNode));
		}
		if (this.multiple == null) {
			this.multiple = LuTreePickerComponent.DEFAULT_ALLOW_MULTIPLE;
		}
	}

	private onNodeChanged(message: TreePickerMessage): void {
		if (message.senderId === this.nodeUniqueId) {
			return;
		}
		// Single
		if (!this.multiple && message.node.isSelected && this.tree.node.isSelected) {
			this.tree.node.isSelected = false;
		}
	}

	public onChecked(tree: ITree, value: boolean = null) {
		// Multi value
		if (this.multiple) {
			tree.node.isSelected = value != null ? value : !tree.node.isSelected;
			this.messenger.notifyNodeChanged(new TreePickerMessage(tree.node, this.nodeUniqueId));
			tree.children.forEach(item => this.onChecked(item, this.multiple ? tree.node.isSelected : false));
			return;
		}

		// Mono value
		tree.node.isSelected = value != null ? value : !tree.node.isSelected;
		this.messenger.notifyNodeChanged(new TreePickerMessage(tree.node, this.nodeUniqueId));
	}

	public onCheckParentOnly(): void {
		this.tree.node.isSelected = !this.tree.node.isSelected;
		this.messenger.notifyNodeChanged(new TreePickerMessage(this.tree.node, this.nodeUniqueId));
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
